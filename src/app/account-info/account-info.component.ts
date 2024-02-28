import {Component, EventEmitter, Output} from '@angular/core';
import {User} from "../interfaces/user";
import {StorageService} from "../services/storage.service";

@Component({
  selector: 'app-account-info',
  standalone: true,
  imports: [],
  templateUrl: './account-info.component.html',
  styleUrl: './account-info.component.css'
})
export class AccountInfoComponent {
  user: User|null = null;

  @Output() hideInfoBlock = new EventEmitter<boolean>();

  constructor(private storage: StorageService) {
  }

  ngOnInit() {
    this.user = this.storage.getCurrentUser();
  }

  showForms() {
    this.hideInfoBlock.emit(false);
  }
}
