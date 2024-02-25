import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service'
import {StorageService} from "../services/storage.service";
import {Observable} from "rxjs";

@Component({
  selector: 'login',
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
              private userService: UserService,
              private storage: StorageService) {

    this.form = this.fb.group({
      username: ['',Validators.required],
      password: ['',Validators.required]
    });
  }

  ngOnInit() {
    let observable: Observable<any>|null = this.userService.getUser();

    if (observable !== null) {
      observable.subscribe((response) => {
        if (response.hasOwnProperty('username')) {
          this.router.navigate(['/profile']);
        }
      });
    }
  }

  login() {
    const form = this.form.value;

    if (form.username && form.password) {
      this.authService.login(form.username, form.password)
        .subscribe(
          (response) => {
            this.storage.saveJwt(response.token);
            this.router.navigate(['/profile']);
          }
        );
    }
  }
}
