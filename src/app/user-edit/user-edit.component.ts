import { Component } from '@angular/core';
import {MatAnchor} from "@angular/material/button";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {FlashMessagesService} from "../helpers/flash-messages.service";
import {UserService} from "../services/user.service";
import {UserFormStateService} from "../helpers/user-form-state.service";
import {NgClass, NgForOf} from "@angular/common";

@Component({
  selector: 'app-user-edit',
  standalone: true,
  imports: [
    MatAnchor,
    RouterLink,
    NgForOf,
    ReactiveFormsModule,
    NgClass
  ],
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.css'
})
export class UserEditComponent {
  accountForm: FormGroup;
  passwordForm: FormGroup;

  validInputClass: string = 'form-control';
  invalidInputClass: string = 'form-control is-invalid';

  roles: string[] = ['ROLE_USER', 'ROLE_ADMIN'];

  id: number = 0;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private flashMessagesService: FlashMessagesService,
    private userService: UserService,
    private userFormState: UserFormStateService,
    private route: ActivatedRoute
  ) {
    this.accountForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', Validators.required],
      role: ['ROLE_USER', Validators.required],
    });

    this.passwordForm = this.fb.group({
      password: ['', Validators.required],
      confirm: ['', Validators.required],
    });

    const id: string|null = this.route.snapshot.paramMap.get('id');

    if (id !== null) {
      this.id = parseInt(id);
    }
  }

  ngOnInit() {
    this.userService.getOneById(this.id)?.subscribe(
      {
        next: user => {
          this.accountForm.controls['firstName'].setValue(user.firstName);
          this.accountForm.controls['lastName'].setValue(user.lastName);
          this.accountForm.controls['username'].setValue(user.username);
          this.accountForm.controls['email'].setValue(user.email);
          this.accountForm.controls['role'].setValue(user.role);
        }
      }
    );
  }

  saveAccount() {
    for (let field in this.accountForm.controls) {
      this.accountForm.controls[field].setErrors(null);
    }

    const form = this.accountForm.value;

    if (form.firstName && form.lastName && form.username && form.email && form.role) {
      this.userService.updateUserById(this.id, form.firstName, form.lastName, form.username, form.email, form.role)
        ?.subscribe(
          {
            next: user => {
              this.userFormState.setState('editedAccount');
              this.router.navigate(['/admin/users']);
            },
            error: response => {
              if (response.status === 400) {
                const errors = response.error.errors;
                for (let field in errors) {
                  this.accountForm.controls[field].setErrors({invalid: errors[field]});
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
    for (let field in this.passwordForm.controls) {
      this.passwordForm.controls[field].setErrors(null);
    }

    const form = this.passwordForm.value;

    if (form.password && form.confirm) {
      this.userService.updatePasswordById(this.id, form.password, form.confirm)?.subscribe(
        {
          next: response => {
            this.userFormState.setState('editedPassword');
            this.router.navigate(['/admin/users']);
          },
          error: response => {
            if (response.status === 400) {
              const errors = response.error.errors;
              for (let field in errors) {
                this.passwordForm.controls[field].setErrors({invalid: errors[field]});
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
