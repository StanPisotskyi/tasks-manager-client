import { Component } from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {UserService} from "./services/user.service";
import {Observable} from "rxjs";
import {User} from "./interfaces/user";
import {StorageService} from "./services/storage.service";
import {NgClass, NgIf} from "@angular/common";
import {LoginStateService} from "./helpers/login-state.service";
import {UrlService} from "./helpers/url.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgIf, NgClass],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  isLoggedIn: boolean = false;
  activeLinkClass: string = 'nav-link active';
  linkClass: string = 'nav-link';
  currentPage: string = '';

  constructor(
    private userService: UserService,
    private storage: StorageService,
    private router: Router,
    private loginState: LoginStateService,
    private urlService: UrlService
  ) {
    this.loginState.data$.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });
  }

  ngOnInit() {
    this.loginState.setData(false);
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

  ngDoCheck() {
    const currentPage = this.urlService.getCurrentPage();

    if (this.currentPage === currentPage) {
      return;
    }

    this.currentPage = currentPage;
  }

  logout() {
    this.isLoggedIn = false;
    this.storage.cleanUserData();
    this.router.navigate(['/login']);
  }
}
