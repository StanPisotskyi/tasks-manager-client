import {CanMatchFn, Route, Router, Routes, UrlSegment} from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import {StorageService} from "./services/storage.service";
import {inject} from "@angular/core";

const isUser: CanMatchFn = (route: Route, segments: UrlSegment[]) => {
  console.log('isUser check');

  const storage: StorageService = inject(StorageService);
  const router = inject(Router);

  const currentUser = storage.getCurrentUser();

  if (currentUser !== null) {
    return true;
  }

  router.navigate(['/login']);

  return false;
};

const isGuest: CanMatchFn = (route: Route, segments: UrlSegment[]) => {
  console.log('isGuest check');

  const storage: StorageService = inject(StorageService);
  const router = inject(Router);

  const currentUser = storage.getCurrentUser();

  if (currentUser === null) {
    return true;
  }

  router.navigate(['/profile']);

  return false;
};

export const routes: Routes = [
  {
    path: 'profile',
    component: ProfileComponent,
    canMatch: [isUser]
  },
  {
    path: 'login',
    component: LoginComponent,
    canMatch: [isGuest]
  },
  {path: '', redirectTo: '/profile', pathMatch: 'full'},
];
