import {CanMatchFn, Route, Router, Routes, UrlSegment} from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import {StorageService} from "./services/storage.service";
import {inject} from "@angular/core";
import {TasksWrapperComponent} from "./tasks-wrapper/tasks-wrapper.component";
import {TaskComponent} from "./task/task.component";

const isUser: CanMatchFn = (route: Route, segments: UrlSegment[]) => {
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
    path: 'tasks/:id',
    component: TaskComponent,
    canMatch: [isUser]
  },
  {
    path: 'tasks',
    component: TasksWrapperComponent,
    canMatch: [isUser]
  },
  {
    path: 'login',
    component: LoginComponent,
    canMatch: [isGuest]
  },
  {path: '', redirectTo: '/profile', pathMatch: 'full'},
];
