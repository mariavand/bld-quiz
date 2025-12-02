import { Component, computed, effect, inject } from '@angular/core';
import { DataService } from '../../../shared/services/data.service';
import { StateService } from '../../../shared/services/state.service';
import { StepperModule } from 'primeng/stepper';
import { ButtonModule } from 'primeng/button';
import { ListboxModule } from 'primeng/listbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'bld-quiz',
  standalone: true,
  imports: [StepperModule, ButtonModule, ListboxModule, RadioButtonModule, ReactiveFormsModule],
  providers: [DataService, StateService],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.scss'
})
export class QuizComponent {
  #dataService = inject(DataService);
  #stateService = inject(StateService);
  #fb = inject(FormBuilder);

  quizData = computed(() => this.#dataService.getQuizData());
  selectedQuestion = computed(() => this.#stateService.getSelectedQuestion());

  form = this.#fb.group({});

  constructor(){
    //Since I use signal, when the data has arrived then I can initialize the form
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
      })
      console.log(this.form);
    })
  }

  print(){
    console.log(this.form);
  }

}
