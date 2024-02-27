import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoginStateService {

  private data = new Subject<boolean>();
  data$ = this.data.asObservable();

  setData(data: boolean) {
    this.data.next(data);
  }
}
