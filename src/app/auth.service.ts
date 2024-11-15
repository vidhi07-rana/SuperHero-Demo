import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);

  get isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken');
  }

  login(token: string) {
    localStorage.setItem('authToken', token);
    this.loggedIn.next(true);
  }

  logout() {
    localStorage.removeItem('authToken');
    this.loggedIn.next(false);
  }
}
