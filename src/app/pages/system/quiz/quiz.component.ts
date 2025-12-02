import { Component, computed, effect, inject } from '@angular/core';
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

@Component({
  selector: 'bld-quiz',
  standalone: true,
  imports: [StepperModule, ButtonModule, ListboxModule, RadioButtonModule, ReactiveFormsModule, ToastModule, ProgressSpinnerModule],
  providers: [DataService, StateService, MessageService],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.scss'
})
export class QuizComponent {
  #dataService = inject(DataService);
  #stateService = inject(StateService);
  #fb = inject(FormBuilder);
  #messageService = inject(MessageService);

  quizData = computed(() => this.#dataService.getQuizData());
  selectedQuestion = computed(() => this.#stateService.getSelectedQuestion());
  hasSubmitted = false;

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
        correctAnswer == userAnswer.a_id ? this.#showSuccessToast() : this.#showErrorToast();
        break;
      case "multiplechoice-multiple":
        if(Array.isArray(correctAnswer)){
          userAnswer = userAnswer.map((item: {[key: string]: number | string}) => item['a_id'])
          const res = userAnswer.every((answer: number, index: number) => answer == correctAnswer[index]);
          res == true ? this.#showSuccessToast() : this.#showErrorToast();
        }
        break;
      default:
        correctAnswer == userAnswer ? this.#showSuccessToast() : this.#showErrorToast();

    }
    this.hasSubmitted = true;
  }

  resetSubmissionFlag(){
    this.hasSubmitted = false;
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
