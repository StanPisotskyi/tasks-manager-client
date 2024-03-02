import { Injectable } from '@angular/core';
import {StorageService} from "./storage.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {Project} from "../interfaces/project";

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  constructor(private storage: StorageService, private http: HttpClient) { }

  public getAll(): Observable<Project[]>|null {
    const jwt = this.storage.getJwt();

    if (jwt === null) {
      return null;
    }

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + jwt })
    };

    return this.http.get<Project[]>(`${environment.apiUrl}/projects`, httpOptions);
  }

  public getOneById(id: number): Observable<Project>|null {
    const jwt = this.storage.getJwt();

    if (jwt === null) {
      return null;
    }

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + jwt })
    };

    return this.http.get<Project>(`${environment.apiUrl}/projects/${id}`, httpOptions);
  }
}
