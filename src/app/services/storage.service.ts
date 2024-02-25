import { Injectable } from '@angular/core';

const USER_KEY = 'token';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  public clean(): void {
    window.sessionStorage.clear();
  }

  public saveJwt(jwt: string): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, jwt);
  }

  public getJwt(): string | null {
    const jwt = window.sessionStorage.getItem(USER_KEY);

    if (jwt) {
      return jwt;
    }

    return null;
  }

  public deleteJwt() {
    window.sessionStorage.removeItem(USER_KEY);
  }
}
