import { Injectable } from '@angular/core';
import {StorageService} from "./storage.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {Count} from "../interfaces/count";
import {ListTask} from "../interfaces/list-task";

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private storage: StorageService, private http: HttpClient) { }

  public getProfileTasksCount(project: number|null): Observable<Count>|null {
    const jwt = this.storage.getJwt();

    if (jwt === null) {
      return null;
    }

    let params = {};

    if (project !== null) {
      params = { project };
    }

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + jwt }),
      params: params
    };

    return this.http.get<Count>(`${environment.apiUrl}/profile/tasks/count`, httpOptions);
  }

  public getTasksCount(project: number|null, user: number|null, statusesList: string[]|null): Observable<Count>|null {
    const jwt = this.storage.getJwt();

    if (jwt === null) {
      return null;
    }

    let statuses: string|null = null;

    if (statusesList !== null && statusesList.length > 0) {
      statuses = statusesList.join(',');
    }

    let params = {};

    params = Object.assign(
      params,
      project === null ? null : { project },
      user === null ? null : { user },
      statuses === null ? null : { statuses }
    );

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + jwt }),
      params: params
    };

    return this.http.get<Count>(`${environment.apiUrl}/tasks/count`, httpOptions);
  }

  public getProfileTasks(limit: number, page: number, project: number|null): Observable<ListTask[]>|null {
    const jwt = this.storage.getJwt();

    if (jwt === null) {
      return null;
    }

    let params = { limit, page };

    params = Object.assign(params, project === null ? null : { project });

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + jwt }),
      params: params
    };

    return this.http.get<ListTask[]>(`${environment.apiUrl}/profile/tasks`, httpOptions);
  }

  public getTasks(limit: number, page: number, project: number|null, user: number|null, statusesList: string[]|null): Observable<ListTask[]>|null {
    const jwt = this.storage.getJwt();

    if (jwt === null) {
      return null;
    }

    let statuses: string|null = null;

    if (statusesList !== null && statusesList.length > 0) {
      statuses = statusesList.join(',');
    }

    let params = { limit, page };

    params = Object.assign(
      params,
      project === null ? null : { project },
      user === null ? null : { user },
      statuses === null ? null : { statuses }
    );

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + jwt }),
      params: params
    };

    return this.http.get<ListTask[]>(`${environment.apiUrl}/tasks`, httpOptions);
  }
}
