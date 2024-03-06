import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserDeleteStateService {

  private id = new Subject<number>();
  id$ = this.id.asObservable();

  setId(id: number) {
    this.id.next(id);
  }
}
