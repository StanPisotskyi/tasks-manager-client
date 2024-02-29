import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {StorageService} from "../services/storage.service";
import {User} from "../interfaces/user";
import {UserService} from "../services/user.service";
import {FlashMessagesService} from "../helpers/flash-messages.service";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-account-forms',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgClass
  ],
  templateUrl: './account-forms.component.html',
  styleUrl: './account-forms.component.css'
})
export class AccountFormsComponent {
  personalDataForm: FormGroup;
  passwordForm: FormGroup;

  validInputClass: string = 'form-control';
  invalidInputClass: string = 'form-control is-invalid';

  @Output() showInfoBlock = new EventEmitter<boolean>();
  @Output() passwordIsChanged = new EventEmitter<boolean>();
  @Output() updatedUser = new EventEmitter<User>();

  constructor(
    private fb: FormBuilder,
    private storage: StorageService,
    private userService: UserService,
    private flashMessagesService: FlashMessagesService
  ) {
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
    for (let field in this.personalDataForm.controls) {
      this.personalDataForm.controls[field].setErrors(null);
    }

    const form = this.personalDataForm.value;

    if (form.firstName && form.lastName && form.username) {
      this.userService.updateUser(form.firstName, form.lastName, form.username)?.subscribe(
        {
          next: response => {
            this.storage.saveJwt(response.token);
            this.userService.getCurrentUser()
              ?.subscribe(user => {
                this.storage.saveCurrentUser(user);
                this.updatedUser.emit(user);
              });
          },
          error: response => {
            if (response.status === 400) {
              const errors = response.error.errors;
              for (let field in errors) {
                this.personalDataForm.controls[field].setErrors({invalid: errors[field]});
              }
            } else {
              this.flashMessagesService.showMessage('Something went wrong...');
            }
          }
        }
      );
    }
  }

  savePassword() {
    const form = this.passwordForm.value;

    if (form.password && form.confirm) {
      this.userService.updatePassword(form.password, form.confirm)?.subscribe({
        next: response => {
          this.passwordForm.reset();
          this.passwordIsChanged.emit(true);
        },
        error: error => {
          this.flashMessagesService.showMessage('Something went wrong...');
        }
      });
    }
  }

  showInfo() {
    this.showInfoBlock.emit(true);
  }
}
