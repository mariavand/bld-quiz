import { effect, inject, Injectable, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  #isAuthenticated = signal(false);
  #router = inject(Router);

  constructor(){
    if(localStorage.getItem('user')){
      this.#refreshStateRecover();
    }
  }

  /**
   *
   * @param username User's username
   * @param password User's password
   * Doesn't return anything, "authenticates" the user.
   */
  login(username: string, password: number){
    console.log(username, password);
    localStorage.setItem('user', JSON.stringify(username));
    this.#isAuthenticated.update(value => !value);
  }

  /**
   * Logouts the user & clear the local storage
   */
  logout(){
    this.#isAuthenticated.update(value => false);
    localStorage.clear();
  }

  /** @returns A boolean observable whether the user is authenticated*/
  isLoggedIn$(): Observable<boolean> {
    return toObservable(this.#isAuthenticated);
  }

  #refreshStateRecover(){
    this.#isAuthenticated.update(value => !value);
    this.#router.navigate(['/system']);
  }

}
