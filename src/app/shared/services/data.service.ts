import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, delay, EMPTY, first, map, Observable, tap } from 'rxjs';
import { environment } from '../../environment/environment';
import { Quiz } from '../layout/models/quiz.model';
import { Score } from '../layout/models/results.model';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable()
export class DataService {

  #http = inject(HttpClient);
  #quizData = toSignal(this.#loadQuizData());
  #resultData = toSignal(this.#loadResultData());

  /**
   * Note: The delay is added only for demo purposes
   * Loads the mock quiz data.
   * @returns Observable of the JSON data.
   */
  #loadQuizData(): Observable<Quiz> {
    return this.#http.get(environment.getQuizData).pipe(
      first(),
      delay(1000),
      map((result) => result as Quiz),
      catchError((err) => {
        console.error(err);
        return EMPTY;
      })
    );
  }

  /**
   * Loads the mock result data.
   * @returns Observable of the JSON data.
   */
  #loadResultData(): Observable<Score> {
    return this.#http.get(environment.getResultsData).pipe(
      first(),
      map((result) => result as Score),
      catchError((err) => {
        console.error(err);
        return EMPTY;
      })
    );
  }

  getQuizData(){
    return this.#quizData();
  }

  getResultsData(){
    return this.#resultData();
  }

}
