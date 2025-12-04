import { HttpClient } from '@angular/common/http';
import { effect, inject, Injectable, signal, WritableSignal } from '@angular/core';
import { catchError, delay, EMPTY, first, map, Observable, tap } from 'rxjs';
import { environment } from '../../environment/environment';
import { Quiz } from '../layout/models/quiz.model';
import { Score } from '../layout/models/results.model';
import { toSignal } from '@angular/core/rxjs-interop';
import { UserAnswer } from '../layout/models/answer.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  #http = inject(HttpClient);
  #quizData = toSignal(this.#loadQuizData());
  #resultData = toSignal(this.#loadResultData());
  #userAnswers: WritableSignal<UserAnswer[] | undefined> = signal(undefined);

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

  getUserAnswers(){
    return this.#userAnswers.asReadonly();
  }

  setUserAnswers(answers: UserAnswer[]){
    this.#userAnswers.set(answers);
  }

}
