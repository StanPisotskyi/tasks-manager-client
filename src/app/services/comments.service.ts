import { Injectable } from '@angular/core';
import {StorageService} from "./storage.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Comment} from "../interfaces/comment";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private storage: StorageService, private http: HttpClient) { }

  public getAllByTaskId(id: number): Observable<Comment[]>|null {
    const jwt = this.storage.getJwt();

    if (jwt === null) {
      return null;
    }

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + jwt })
    };

    return this.http.get<Comment[]>(`${environment.apiUrl}/comments/${id}/task`, httpOptions);
  }
}
