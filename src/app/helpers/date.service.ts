import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor() { }

  public format(valueToFormat: string): string {
    const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const date = new Date(valueToFormat);

    return date.getDate() + ' ' + month[date.getMonth()] + ' ' + date.getFullYear();
  }
}
