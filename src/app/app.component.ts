import { Component } from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {UserService} from "./services/user.service";
import {Observable} from "rxjs";
import {User} from "./interfaces/user";
import {StorageService} from "./services/storage.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  public isLoggedIn: boolean = false;

  constructor(private userService: UserService, private storage: StorageService, private router: Router) {
  }

  ngOnInit() {
    console.log('App component ngOnInit');

    let observable: Observable<User>|null = this.userService.getCurrentUser();

    if (observable === null) {
      this.storage.deleteCurrentUser();
    } else {
      this.isLoggedIn = true;

      observable.subscribe((user) => {
        this.storage.saveCurrentUser(user);
      });
    }
  }

  logout() {
    this.isLoggedIn = false;
    this.storage.cleanUserData();
    this.router.navigate(['/login']);
  }
}
