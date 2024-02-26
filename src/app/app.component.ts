import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {UserService} from "./services/user.service";
import {Observable} from "rxjs";
import {User} from "./interfaces/user";
import {StorageService} from "./services/storage.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'tasks-manager';

  constructor(private userService: UserService, private storage: StorageService) {
  }

  ngOnInit() {
    console.log('App component ngOnInit');

    let observable: Observable<User>|null = this.userService.getCurrentUser();

    if (observable === null) {
      this.storage.deleteCurrentUser();
    } else {
      observable.subscribe((user) => {
        this.storage.saveCurrentUser(user);
      });
    }
  }
}
