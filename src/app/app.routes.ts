import {CanMatchFn, Route, Router, Routes, UrlSegment} from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import {StorageService} from "./services/storage.service";
import {inject} from "@angular/core";
import {TasksWrapperComponent} from "./tasks-wrapper/tasks-wrapper.component";
import {TaskComponent} from "./task/task.component";
import {TaskCreateComponent} from "./task-create/task-create.component";
import {TaskEditComponent} from "./task-edit/task-edit.component";
import {ProjectsComponent} from "./projects/projects.component";

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



const isAdmin: CanMatchFn = (route: Route, segments: UrlSegment[]) => {
  const storage: StorageService = inject(StorageService);
  const router = inject(Router);

  const currentUser = storage.getCurrentUser();

  if (currentUser === null) {
    router.navigate(['/login']);
    return false;
  }

  if (currentUser.role === 'ROLE_USER') {
    router.navigate(['/profile']);
    return false;
  }

  return true;
};

export const routes: Routes = [
  {
    path: 'profile',
    component: ProfileComponent,
    canMatch: [isUser]
  },
  {
    path: 'tasks/create',
    component: TaskCreateComponent,
    canMatch: [isUser]
  },
  {
    path: 'tasks/:id/edit',
    component: TaskEditComponent,
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
    path: 'admin/projects',
    component: ProjectsComponent,
    canMatch: [isAdmin]
  },
  {
    path: 'login',
    component: LoginComponent,
    canMatch: [isGuest]
  },
  {path: '', redirectTo: '/profile', pathMatch: 'full'},
  {path: 'admin', redirectTo: '/admin/projects', pathMatch: 'full'},
];
