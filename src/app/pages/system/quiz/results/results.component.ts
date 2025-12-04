import { Component, computed, inject } from '@angular/core';
import { DataService } from '../../../../shared/services/data.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { first, map } from 'rxjs';
import { SplitterModule } from 'primeng/splitter';
import { CardModule } from 'primeng/card';


@Component({
  selector: 'bld-results',
  standalone: true,
  imports: [SplitterModule, CardModule],
  providers: [DataService],
  templateUrl: './results.component.html',
  styleUrl: './results.component.scss'
})
export class ResultsComponent {
  #dataService = inject(DataService);
  #route = inject(ActivatedRoute);

  quizData = computed(() => this.#dataService.getQuizData());
  resultsData = computed(() => this.#dataService.getResultsData()?.results);

  #points = toSignal(this.#route.paramMap.pipe(
    first(),
    map((params) => {
      console.log(params);
      return Number(params.get('points'));
    })
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
}
