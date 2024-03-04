import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoginStateService {

  private data = new Subject<string|null>();
  data$ = this.data.asObservable();

  setData(role: string|null) {
    this.data.next(role);
  }
}
