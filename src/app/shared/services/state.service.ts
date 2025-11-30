import { Injectable, signal } from '@angular/core';

@Injectable()
export class StateService {
  #userAnswers = signal([]);
  #selectedQuestion = signal(0);

  constructor(){
    const selectedQuestion = localStorage.getItem('selectedQuestion');
    if(selectedQuestion){
      this.setSelectedQuestion(+JSON.parse(selectedQuestion));
    }
  }

  getUserAnswers(){
    return this.#userAnswers();
  }

  getSelectedQuestion(){
    return this.#selectedQuestion();
  }

  setSelectedQuestion(num: number){
    this.#selectedQuestion.update(() => num);
  }
}
