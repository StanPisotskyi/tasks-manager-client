import { Component } from '@angular/core';
import {AccountInfoComponent} from "../account-info/account-info.component";
import {AccountFormsComponent} from "../account-forms/account-forms.component";
import {NgClass} from "@angular/common";

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

  setShowInfo(showInfo: boolean) {
    this.showInfo = showInfo;
  }
}
