import {Component, EventEmitter, Input, Output} from '@angular/core';
import {User} from "../interfaces/user";

@Component({
  selector: 'app-account-info',
  standalone: true,
  imports: [],
  templateUrl: './account-info.component.html',
  styleUrl: './account-info.component.css'
})
export class AccountInfoComponent {
  @Output() hideInfoBlock = new EventEmitter<boolean>();
  @Input() user: User|null = null;

  showForms() {
    this.hideInfoBlock.emit(false);
  }
}
