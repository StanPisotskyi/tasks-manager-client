import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import { User } from '../interfaces/user'
import {Default} from "../interfaces/default";
import {Login} from "../interfaces/login";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private storage: StorageService, private http: HttpClient) { }

  // @ts-ignore
  public getCurrentUser(): Observable<User>|null {
    const jwt = this.storage.getJwt();

    if (jwt === null) {
      return null;
    }

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + jwt })
    };

    return this.http.get<User>(`${environment.apiUrl}/profile/me`, httpOptions);
  }

  public updatePassword (password: string, confirm: string): Observable<Default>|null {
    const jwt = this.storage.getJwt();

    if (jwt === null) {
      return null;
    }

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + jwt })
    };

    return this.http.put<Default>(
      `${environment.apiUrl}/profile/password`,
      {
        password,
        confirm
      },
      httpOptions
    );
  }
}
