import { Component } from '@angular/core';
import {User} from "../interfaces/user";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router, RouterLink} from "@angular/router";
import {FlashMessagesService} from "../helpers/flash-messages.service";
import {NgClass, NgForOf} from "@angular/common";
import {MatAnchor} from "@angular/material/button";
import {UserService} from "../services/user.service";
import {UserFormStateService} from "../helpers/user-form-state.service";

@Component({
  selector: 'app-user-create',
  standalone: true,
  imports: [
    NgForOf,
    ReactiveFormsModule,
    NgClass,
    MatAnchor,
    RouterLink
  ],
  templateUrl: './user-create.component.html',
  styleUrl: './user-create.component.css'
})
export class UserCreateComponent {
  form: FormGroup;

  validInputClass: string = 'form-control';
  invalidInputClass: string = 'form-control is-invalid';

  roles: string[] = ['ROLE_USER', 'ROLE_ADMIN'];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private flashMessagesService: FlashMessagesService,
    private userService: UserService,
    private userFormState: UserFormStateService
  ) {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      role: ['ROLE_USER', Validators.required],
    });
  }

  save() {
    for (let field in this.form.controls) {
      this.form.controls[field].setErrors(null);
    }

    const form = this.form.value;

    if (form.firstName && form.lastName && form.username && form.email && form.password && form.role) {
      this.userService.create(form.firstName, form.lastName, form.username, form.email, form.password, form.role)
        ?.subscribe(
          {
            next: user => {
              this.userFormState.setState('created');
              this.router.navigate(['/admin/users']);
            },
            error: response => {
              if (response.status === 400) {
                const errors = response.error.errors;
                for (let field in errors) {
                  this.form.controls[field].setErrors({invalid: errors[field]});
                }
              } else {
                this.flashMessagesService.showMessage('Something went wrong...');
              }
            }
          }
        );
    }
  }
}
