import { Injectable } from '@angular/core';
import {StorageService} from "./storage.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {Count} from "../interfaces/count";

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private storage: StorageService, private http: HttpClient) { }

  public getProfileTasksCount(): Observable<Count>|null {
    const jwt = this.storage.getJwt();

    if (jwt === null) {
      return null;
    }

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + jwt })
    };

    return this.http.get<Count>(`${environment.apiUrl}/profile/tasks/count`, httpOptions);
  }
}
