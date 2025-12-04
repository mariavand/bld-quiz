import { Component, computed, effect, inject, Signal } from '@angular/core';
import { DataService } from '../../../../shared/services/data.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { first, map } from 'rxjs';
import { SplitterModule } from 'primeng/splitter';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { FieldsetModule } from 'primeng/fieldset';
import { UserAnswer } from '../../../../shared/layout/models/answer.model';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'bld-results',
  standalone: true,
  imports: [SplitterModule, CardModule, DividerModule, FieldsetModule, CommonModule],
  templateUrl: './results.component.html',
  styleUrl: './results.component.scss'
})
export class ResultsComponent {
  #dataService = inject(DataService);
  #route = inject(ActivatedRoute);

  quizData = computed(() => this.#dataService.getQuizData());
  resultsData = computed(() => this.#dataService.getResultsData()?.results);
  userAnswers = this.#dataService.getUserAnswers();

  #points = toSignal(this.#route.paramMap.pipe(
    first(),
    map((params) => Number(params.get('points')))
  ));

  #maximumPoints = computed(() => this.#dataService.getQuizData()?.questions.reduce((count, value) => count + value.points, 0));

  calculatedScore = computed(() => {
    if(this.#points() && this.#maximumPoints() != 0){
      return this.#points()! * 100 / this.#maximumPoints()!;
    }
    else{
      return 0;
    }
  });

  userResult = computed(() => this.resultsData()?.filter((result) => result.minpoints <= this.calculatedScore() && result.maxpoints >= this.calculatedScore())[0]);

  correctAnswer: Signal<UserAnswer[]> = computed(() => {
    return (this.quizData()?.questions.map((q) => {
      switch(q?.question_type){
        case "multiplechoice-single":
          return q.possible_answers?.filter((answer) => answer.a_id == q.correct_answer)[0];
        case "multiplechoice-multiple":
          return (q.correct_answer as Number[]).map((ca) => q.possible_answers?.filter((answer) => answer.a_id == ca)[0]);
        default:
          return q.correct_answer;
      }
    })) as UserAnswer[];
  })

  constructor(){
    effect(() => {
      console.log('ca', this.correctAnswer());
      console.log('ua', this.userAnswers());
    })
  }
}
