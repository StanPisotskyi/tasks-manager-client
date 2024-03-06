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

  public updateUser(firstName: string, lastName: string, username: string): Observable<Login>|null {
    const jwt = this.storage.getJwt();

    if (jwt === null) {
      return null;
    }

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + jwt })
    };

    return this.http.put<Login>(
      `${environment.apiUrl}/profile/me`,
      {
        firstName,
        lastName,
        username
      },
      httpOptions
    );
  }

  public getAll(): Observable<User[]>|null {
    const jwt = this.storage.getJwt();

    if (jwt === null) {
      return null;
    }

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + jwt })
    };

    return this.http.get<User[]>(`${environment.apiUrl}/users`, httpOptions);
  }

  public getOneById(id: number): Observable<User>|null {
    const jwt = this.storage.getJwt();

    if (jwt === null) {
      return null;
    }

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + jwt })
    };

    return this.http.get<User>(`${environment.apiUrl}/users/${id}`, httpOptions);
  }

  public create(firstName: string, lastName: string, username: string, email: string, password: string, role: string): Observable<User>|null {
    const jwt = this.storage.getJwt();

    if (jwt === null) {
      return null;
    }

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + jwt })
    };

    return this.http.post<User>(
      `${environment.apiUrl}/users`,
      {
        firstName,
        lastName,
        username,
        email,
        password,
        role
      },
      httpOptions
    );
  }

  public updateUserById(id: number, firstName: string, lastName: string, username: string, email: string, role: string): Observable<User>|null {
    const jwt = this.storage.getJwt();

    if (jwt === null) {
      return null;
    }

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + jwt })
    };

    return this.http.put<User>(
      `${environment.apiUrl}/users/${id}/account`,
      {
        firstName,
        lastName,
        username,
        email,
        role
      },
      httpOptions
    );
  }



  public updatePasswordById (id: number, password: string, confirm: string): Observable<Default>|null {
    const jwt = this.storage.getJwt();

    if (jwt === null) {
      return null;
    }

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + jwt })
    };

    return this.http.put<Default>(
      `${environment.apiUrl}/users/${id}/password`,
      {
        password,
        confirm
      },
      httpOptions
    );
  }
}
