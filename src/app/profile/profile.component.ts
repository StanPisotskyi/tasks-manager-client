import { Component } from '@angular/core';
import {AccountComponent} from "../account/account.component";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    AccountComponent
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
}
