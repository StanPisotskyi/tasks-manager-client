import { Injectable } from '@angular/core';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  constructor(private router: Router) { }

  public getCurrentPage(): string {
    let url: string = this.router.url.replace(/^\//g, '');
    const preparedUrl: string = url.substring(0, url.indexOf('?'));
    const currentPage = preparedUrl === '' ? url : preparedUrl;

    return currentPage.split('/')[0];
  }
}
