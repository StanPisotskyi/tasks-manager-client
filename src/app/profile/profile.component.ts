import { Component } from '@angular/core';
import {Observable} from "rxjs";
import {UserService} from "../services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  constructor(private userService: UserService, private router: Router) {
  }
  ngOnInit() {
    let observable: Observable<any>|null = this.userService.getUser();

    if (observable === null) {
      this.router.navigate(['/login']);
      return;
    }

    observable.subscribe((response) => {
      if (!response.hasOwnProperty('username')) {
        this.router.navigate(['/login']);
      }
    });
  }
}
