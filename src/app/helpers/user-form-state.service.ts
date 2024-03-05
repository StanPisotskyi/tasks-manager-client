import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserFormStateService {

  private state = new Subject<string|null>();
  state$ = this.state.asObservable();

  setState(state: string|null) {
    this.state.next(state);
  }
}
