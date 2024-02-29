import { Component } from '@angular/core';
import {AccountInfoComponent} from "../account-info/account-info.component";
import {AccountFormsComponent} from "../account-forms/account-forms.component";
import {NgClass} from "@angular/common";
import {FlashMessagesService} from "../helpers/flash-messages.service";
import {FlashModule} from "simple-flash-message";

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [
    AccountInfoComponent,
    AccountFormsComponent,
    NgClass,
    FlashModule
  ],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent {
  showInfo: boolean = true;
  classHidden: string = 'hidden';

  constructor(private flashMessagesService: FlashMessagesService) {
  }

  onShowInfo(showInfo: boolean) {
    this.showInfo = showInfo;
  }

  onPasswordChanged(isChanged: boolean) {
    this.showInfo = isChanged;
    this.flashMessagesService.showSuccessMessage('Success!', 'Password has been changed.');
  }
}
