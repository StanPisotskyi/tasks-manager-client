import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import { AuthService } from '../services/auth.service';
import {StorageService} from "../services/storage.service";
import {UserService} from "../services/user.service";
import {LoginStateService} from "../helpers/login-state.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  form:FormGroup;

  constructor(private fb:FormBuilder,
              private authService: AuthService,
              private router: Router,
              private storage: StorageService,
              private userService: UserService,
              private loginState: LoginStateService) {

    this.form = this.fb.group({
      username: ['',Validators.required],
      password: ['',Validators.required]
    });
  }

  login() {
    const form = this.form.value;

    if (form.username && form.password) {
      this.authService.login(form.username, form.password)
        .subscribe(
          (response) => {
            this.storage.saveJwt(response.token);
            this.userService.getCurrentUser()
              ?.subscribe((user) => {
                this.storage.saveCurrentUser(user);
                this.loginState.setData(true);
                this.router.navigate(['/profile']);
              });
          }
        );
    }
  }
}
