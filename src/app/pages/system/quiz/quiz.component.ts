import { Component, computed, effect, inject, signal } from '@angular/core';
import { DataService } from '../../../shared/services/data.service';
import { StateService } from '../../../shared/services/state.service';
import { StepperModule } from 'primeng/stepper';
import { ButtonModule } from 'primeng/button';
import { ListboxModule } from 'primeng/listbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserAnswer } from '../../../shared/layout/models/answer.model';

@Component({
  selector: 'bld-quiz',
  standalone: true,
  imports: [StepperModule, ButtonModule, ListboxModule, RadioButtonModule, ReactiveFormsModule, ToastModule, ProgressSpinnerModule, CommonModule],
  providers: [DataService, StateService, MessageService],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.scss'
})
export class QuizComponent {
  #dataService = inject(DataService);
  #stateService = inject(StateService);
  #fb = inject(FormBuilder);
  #messageService = inject(MessageService);
  #router = inject(Router);

  quizData = computed(() => this.#dataService.getQuizData());
  selectedQuestion = computed(() => this.#stateService.getSelectedQuestion());
  hasSubmitted = signal(false);
  points = signal(0);

  form = this.#fb.group({});

  constructor(){
    //Since I use signals, when the data has arrived then I can initialize the form
    effect(() => {
      this.quizData()?.questions.map((question) => {
        if(question.question_type.includes('multiplechoice-single')){
          this.form.addControl(question.q_id.toString(), this.#fb.control('', [Validators.required]));
        }
        else if(question.question_type.includes('multiplechoice-multiple')){
          this.form.addControl(question.q_id.toString(), this.#fb.control('', [Validators.required]))
        }
        else{
          this.form.addControl(question.q_id.toString(), this.#fb.control(undefined, [Validators.required]));
        }
      });
    })
  }

  f(k: string): FormControl {
    return this.form.get(k) as FormControl;
  }

  showMessage(q_id: number){
    const question = this.quizData()?.questions.filter((q) => q.q_id == q_id)[0];

    let correctAnswer: number | number[] | boolean = question!.correct_answer;
    let userAnswer = this.f(q_id.toString()).value;

    switch(question?.question_type){
      case "multiplechoice-single":
        if(correctAnswer == userAnswer.a_id){
          this.#addPoints(question.points);
          this.#showSuccessToast();
        }
        else{
          this.#showErrorToast();
        }
        break;
      case "multiplechoice-multiple":
        if(Array.isArray(correctAnswer)){
          userAnswer = userAnswer.map((item: {[key: string]: number | string}) => item['a_id'])
          const res = userAnswer.every((answer: number, index: number) => answer == correctAnswer[index]);
          if(res == true){
            this.#showSuccessToast();
            this.#addPoints(question.points);
          }
          else{
            this.#showErrorToast();
          }
        }
        break;
      default:
        if(correctAnswer == userAnswer){
          this.#addPoints(question!.points);
          this.#showSuccessToast();
        }
        else{
          this.#showErrorToast();
        }
    }
    this.hasSubmitted.set(true);
  }

  #addPoints(points: number){
    console.log(points);
    this.points.update((value) => value + points);
    console.log(this.points());
  }

  statusQuiz(q_id: number){
    if(q_id == this.quizData()?.questions.length){
      console.log(this.form.value);
      this.#dataService.setUserAnswers(this.form.value as UserAnswer[]);
      this.#router.navigate(['/system/results', this.points()]);
    }
  }

  showCorrectAnswers(correctAnswer: number | number[] | boolean){
    // console.log(correctAnswer);
    // const list = document.querySelectorAll('li[role=option].p-listbox-option').forEach((item: Element) => {
    //   console.log(item.innerHTML);
    //   // if(item.innerText){

    //   // }
    // });
    // //innerText
    // console.log('list', list);
  }

  resetSubmissionFlag(){
    this.hasSubmitted.set(false);
  }

  #showSuccessToast() {
    this.#messageService.add({
      severity: 'success',
      summary: 'Wow! Amazing!',
      detail: 'You rock!',
      key: 'tr'
    });
  }

  #showErrorToast() {
    this.#messageService.add({
      severity: 'error',
      summary: 'Wrong Answer!',
      detail: 'You can better!',
      key: 'tr'
    });
  }

}
