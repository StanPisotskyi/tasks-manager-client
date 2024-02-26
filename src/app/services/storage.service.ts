import { Injectable } from '@angular/core';
import {User} from "../interfaces/user";

const TOKEN_KEY = 'token';
const USER_KEY = 'user';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  public clean(): void {
    window.sessionStorage.clear();
  }

  public saveJwt(jwt: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, jwt);
  }

  public getJwt(): string|null {
    const jwt = window.sessionStorage.getItem(TOKEN_KEY);

    if (jwt) {
      return jwt;
    }

    return null;
  }

  public deleteJwt() {
    window.sessionStorage.removeItem(TOKEN_KEY);
  }

  public getCurrentUser(): User|null {
    const data = window.sessionStorage.getItem(USER_KEY);

    if (data) {
      return JSON.parse(data);
    }

    return null;
  }

  public saveCurrentUser(user: User) {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public deleteCurrentUser() {
    window.sessionStorage.removeItem(USER_KEY);
  }

  public cleanUserData(): void {
    this.deleteJwt();
    this.deleteCurrentUser();
  }
}
