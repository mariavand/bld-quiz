import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable()
export class AuthService {

  #isAuthenticated = false;

  /**
   *
   * @param username User's username
   * @param password User's password
   * Doesn't return anything, "authenticates" the user.
   */
  login(username: string, password: number){
    localStorage.setItem('user', JSON.stringify(username));
    this.#isAuthenticated = true;
  }

  /**
   * Logouts the user & clear the local storage
   */
  logout(){
    this.#isAuthenticated = false;
    localStorage.clear();
  }

  /** @returns A boolean observable whether the user is authenticated*/
  isLoggedIn$(): Observable<boolean> {
    return of(this.#isAuthenticated);
  }

}
