import { Component, computed, effect, inject } from '@angular/core';
import { DataService } from '../../../shared/services/data.service';
import { StateService } from '../../../shared/services/state.service';
import { StepperModule } from 'primeng/stepper';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'bld-quiz',
  standalone: true,
  imports: [StepperModule, ButtonModule],
  providers: [DataService, StateService],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.scss'
})
export class QuizComponent {
  #dataService = inject(DataService);
  #stateService = inject(StateService);

  quizData = computed(() => this.#dataService.getQuizData());
  selectedQuestion = computed(() => this.#stateService.getSelectedQuestion());

  constructor(){
    effect(() => {console.log(this.quizData());})
  }
}
