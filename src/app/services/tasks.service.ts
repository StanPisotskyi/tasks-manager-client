import { Injectable } from '@angular/core';
import {StorageService} from "./storage.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {Count} from "../interfaces/count";
import {ListTask} from "../interfaces/list-task";
import {Task} from "../interfaces/task";
import {Default} from "../interfaces/default";

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

  public getOneById(id: number): Observable<Task>|null {
    const jwt = this.storage.getJwt();

    if (jwt === null) {
      return null;
    }

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + jwt })
    };

    return this.http.get<Task>(`${environment.apiUrl}/tasks/${id}`, httpOptions);
  }

  public create(title: string, description: string, status: string, projectId: number, assignedToId: number): Observable<Task>|null {
    const jwt = this.storage.getJwt();

    if (jwt === null) {
      return null;
    }

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + jwt })
    };

    return this.http.post<Task>(
      `${environment.apiUrl}/tasks`,
      {
        title,
        description,
        status,
        projectId,
        assignedToId
      },
      httpOptions
    );
  }

  public edit(id: number, title: string, description: string, status: string, projectId: number, assignedToId: number): Observable<Task>|null {
    const jwt = this.storage.getJwt();

    if (jwt === null) {
      return null;
    }

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + jwt })
    };

    return this.http.put<Task>(
      `${environment.apiUrl}/tasks/${id}`,
      {
        title,
        description,
        status,
        projectId,
        assignedToId
      },
      httpOptions
    );
  }

  public delete(id: number): Observable<Default>|null {
    const jwt = this.storage.getJwt();

    if (jwt === null) {
      return null;
    }

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + jwt })
    };

    return this.http.delete<Default>(
      `${environment.apiUrl}/tasks/${id}`,
      httpOptions
    );
  }
}
