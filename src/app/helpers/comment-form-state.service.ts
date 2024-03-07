import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import {CommentState} from "../interfaces/comment-state";

@Injectable({
  providedIn: 'root'
})
export class CommentFormStateService {

  private data = new Subject<CommentState>();
  data$ = this.data.asObservable();

  setData(data: CommentState) {
    this.data.next(data);
  }
}
