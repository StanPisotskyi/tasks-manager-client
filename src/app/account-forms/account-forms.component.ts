import { Component } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {FlashModule} from "simple-flash-message";
import {StorageService} from "../services/storage.service";
import {User} from "../interfaces/user";

@Component({
  selector: 'app-account-forms',
  standalone: true,
  imports: [
    FlashModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './account-forms.component.html',
  styleUrl: './account-forms.component.css'
})
export class AccountFormsComponent {
  personalDataForm: FormGroup;
  passwordForm: FormGroup;

  constructor(private fb: FormBuilder, private storage: StorageService) {
    const user: User|null = this.storage.getCurrentUser();

    this.personalDataForm = this.fb.group({
      firstName: [user?.firstName, Validators.required],
      lastName: [user?.lastName, Validators.required],
      username: [user?.username, Validators.required]
    });

    this.passwordForm = this.fb.group({
      password: ['', Validators.required],
      confirm: ['', Validators.required]
    });
  }

  savePersonalData() {

  }

  savePassword() {

  }
}
