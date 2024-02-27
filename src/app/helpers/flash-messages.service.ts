import { Injectable } from '@angular/core';
import {FlashService} from "simple-flash-message";

@Injectable({
  providedIn: 'root'
})
export class FlashMessagesService {

  constructor(private flashService: FlashService) { }

  public showSuccessMessage(title: string, message: string): void {
    this.showMessage('success', title, message);
  }

  public showErrorMessage(title: string, message: string): void {
    this.showMessage('error', title, message);
  }
  
  private showMessage(type: 'success'|'error', title: string, message: string): void {
    this.flashService.showFlash(type, title, message);
  }
}
