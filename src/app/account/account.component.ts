import { Component } from '@angular/core';
import {AccountInfoComponent} from "../account-info/account-info.component";
import {AccountFormsComponent} from "../account-forms/account-forms.component";
import {NgClass} from "@angular/common";
import {FlashMessagesService} from "../helpers/flash-messages.service";
import {StorageService} from "../services/storage.service";
import {User} from "../interfaces/user";

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [
    AccountInfoComponent,
    AccountFormsComponent,
    NgClass
  ],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent {
  showInfo: boolean = true;
  classHidden: string = 'hidden';
  currentUser:User|null;

  constructor(private flashMessagesService: FlashMessagesService, private storage: StorageService) {
    this.currentUser = this.storage.getCurrentUser();
  }

  onShowInfo(showInfo: boolean) {
    this.showInfo = showInfo;
  }

  onPasswordChanged(isChanged: boolean) {
    this.showInfo = isChanged;
    this.flashMessagesService.showMessage('Password has been changed.');
  }

  onUSerUpdated(user: User) {
    this.showInfo = true;
    this.currentUser = user;
    this.flashMessagesService.showMessage('Personal data have been changed.');
  }
}
