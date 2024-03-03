import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatAutocomplete, MatAutocompleteTrigger, MatOption} from "@angular/material/autocomplete";
import {Project} from "../interfaces/project";
import {MatInput} from "@angular/material/input";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {map, Observable, startWith} from "rxjs";
import {AsyncPipe, NgIf} from "@angular/common";
import {ProjectsService} from "../services/projects.service";
import {User} from "../interfaces/user";
import {UserService} from "../services/user.service";
import {MatSelect} from "@angular/material/select";

@Component({
  selector: 'app-tasks-filters',
  standalone: true,
  imports: [
    MatFormField,
    MatAutocomplete,
    MatOption,
    MatInput,
    ReactiveFormsModule,
    MatLabel,
    MatAutocompleteTrigger,
    AsyncPipe,
    NgIf,
    MatSelect
  ],
  templateUrl: './tasks-filters.component.html',
  styleUrl: './tasks-filters.component.css'
})
export class TasksFiltersComponent {
  @Input() showUsersFilter: boolean = false;
  @Input() showStatusesFilter: boolean = false;

  projects: Project[] = [];
  filteredProjects: Observable<Project[]> = new Observable<Project[]>();
  projectsFilterForm: FormControl<string | Project | null> = new FormControl<string | Project>('');
  @Output() selectedProject = new EventEmitter<Project|null>;
  @Input() lastSelectedProjectId: number|null = null;

  users: User[] = [];
  filteredUsers: Observable<User[]> = new Observable<User[]>();
  usersFilterForm: FormControl<string | User | null> = new FormControl<string | User>('');
  @Output() selectedUser = new EventEmitter<User|null>;
  @Input() lastSelectedUserId: number|null = null;

  statusesFilter: FormControl<string|string[]|null> = new FormControl('');
  statuses: string[] = ['NEW', 'IN_PROGRESS', 'TESTING', 'CLOSED'];
  @Output() selectedStatuses = new EventEmitter<string[]|null>;
  @Input() lastSelectedStatuses: string[]|null = null;

  constructor(private projectsService: ProjectsService, private userService: UserService) {
  }

  ngOnInit() {
    this.prepareProjects();

    if (this.showUsersFilter) {
      this.prepareUsers();
    }

    if (this.showStatusesFilter && this.lastSelectedStatuses !== null) {
      this.statusesFilter.setValue(this.lastSelectedStatuses);
    }
  }

  private prepareProjects() {
    this.projectsService.getAll()?.subscribe(
      {
        next: projects => {
          this.projects = projects;

          this.filteredProjects = this.projectsFilterForm.valueChanges.pipe(
            startWith(''),
            map(project => {
              const title = typeof project === 'string' ? project : project?.title;
              return title ? this.filterProject(title as string) : this.projects.slice();
            })
          );
        }
      }
    );

    if (this.lastSelectedProjectId !== null) {
      this.projectsService.getOneById(this.lastSelectedProjectId)?.subscribe(
        {
          next: project => {
            this.projectsFilterForm.setValue(project);
          }
        }
      );
    }
  }

  private prepareUsers() {
    this.userService.getAll()?.subscribe(
      {
        next: users => {
          this.users = users;

          this.filteredUsers = this.usersFilterForm.valueChanges.pipe(
            startWith(''),
            map(user => {
              const title = typeof user === 'string' ? user : (user?.firstName + ' ' + user?.lastName);
              return title ? this.filterUser(title as string) : this.users.slice();
            })
          );
        }
      }
    );

    if (this.lastSelectedUserId !== null) {
      this.userService.getOneById(this.lastSelectedUserId)?.subscribe(
        {
          next: user => {
            this.usersFilterForm.setValue(user);
          }
        }
      );
    }
  }

  displayProject(project: Project): string {
    return project && project.title ? project.title : '';
  }

  onProjectChanged(project: Project) {
    this.selectedProject.emit(project);
  }

  resetProject() {
    if (this.projectsFilterForm.value !== '') {
      return;
    }

    this.selectedProject.emit(null);
  }

  private filterProject(title: string): Project[] {
    const filterValue = title.toLowerCase();

    return this.projects.filter(option => option.title.toLowerCase().includes(filterValue));
  }

  displayUser(user: User): string {
    return user && user.firstName && user.lastName ? (user.firstName + ' ' + user.lastName) : '';
  }

  onUserChanged(user: User) {
    this.selectedUser.emit(user);
  }

  resetUser() {
    if (this.usersFilterForm.value !== '') {
      return;
    }

    this.selectedUser.emit(null);
  }

  onStatusesChanged(statuses: string[]) {
    this.selectedStatuses.emit(statuses.length > 0 ? statuses : null);
  }

  private filterUser(value: string): User[] {
    const filterValue = value.toLowerCase();

    return this.users.filter(option => {
      const fullName = option.firstName + ' ' + option.lastName;
      fullName.toLowerCase().includes(filterValue)
    });
  }
}
