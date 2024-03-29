import { Component } from '@angular/core';
import {TasksService} from "../services/tasks.service";
import {ListTask} from "../interfaces/list-task";
import {TasksListComponent} from "../tasks-list/tasks-list.component";
import {DateService} from "../helpers/date.service";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {TasksPaginationComponent} from "../tasks-pagination/tasks-pagination.component";
import {PageEvent} from "@angular/material/paginator";
import {TasksFiltersComponent} from "../tasks-filters/tasks-filters.component";
import {Project} from "../interfaces/project";
import {UrlService} from "../helpers/url.service";
import {User} from "../interfaces/user";
import {MatAnchor} from "@angular/material/button";

@Component({
  selector: 'app-tasks-wrapper',
  standalone: true,
  imports: [
    TasksListComponent,
    TasksPaginationComponent,
    TasksFiltersComponent,
    MatAnchor,
    RouterLink
  ],
  templateUrl: './tasks-wrapper.component.html',
  styleUrl: './tasks-wrapper.component.css'
})
export class TasksWrapperComponent {
  total: number = 0;
  tasks: ListTask[] = [];
  limit: number = 10;
  offset: number = 0;
  url: string = 'profile';
  project: number|null = null;
  user: number|null = null;
  showUsersFilter: boolean = false;
  showStatusesFilter: boolean = false;
  statuses: string[]|null = null;

  constructor(
    private tasksService: TasksService,
    private dateService: DateService,
    private router: Router,
    private route: ActivatedRoute,
    private urlService: UrlService
  ) {
  }

  ngOnInit() {
    this.url = this.urlService.getCurrentPage();

    const limit: string|null = this.route.snapshot.queryParamMap.get('limit');
    const offset: string|null = this.route.snapshot.queryParamMap.get('offset');
    const project: string|null = this.route.snapshot.queryParamMap.get('project');
    const user: string|null = this.route.snapshot.queryParamMap.get('user');
    const statusesParam: string|null = this.route.snapshot.queryParamMap.get('statuses');

    if (limit !== null) {
      this.limit = parseInt(limit);
    }

    if (offset !== null) {
      this.offset = parseInt(offset);
    }

    if (project !== null) {
      this.project = parseInt(project);
    }

    if (user !== null) {
      this.user = parseInt(user);
    }

    if (statusesParam !== null) {
      this.statuses = statusesParam.split(',').map(status => {return status.toUpperCase()});
    }

    if (this.url === 'profile') {
      this.prepareProfileData();
    } else {
      this.showUsersFilter = true;
      this.showStatusesFilter = true;
      this.prepareData();
    }
  }

  private prepareProfileData() {
    this.tasksService.getProfileTasksCount(this.project)?.subscribe(
      {
        next: response => {
          this.total = response.total;
        }
      }
    );

    this.tasksService.getProfileTasks(this.limit, this.offset, this.project)?.subscribe(
      {
        next: tasks => {
          let preparedList = tasks;

          for (let i = 0; i < preparedList.length; i++) {
            preparedList[i].formattedDate = this.dateService.format(preparedList[i].createdAt);

            let fullName = 'none';
            const assignedTo = preparedList[i].assignedTo;

            if (assignedTo !== null) {
              fullName = assignedTo.firstName + ' ' + assignedTo.lastName;
            }

            preparedList[i].fullName = fullName;
          }

          this.tasks = preparedList;
        }
      }
    );
  }

  private prepareData() {
    this.tasksService.getTasksCount(this.project, this.user, this.statuses)?.subscribe(
      {
        next: response => {
          this.total = response.total;
        }
      }
    );

    this.tasksService.getTasks(this.limit, this.offset, this.project, this.user, this.statuses)?.subscribe(
      {
        next: tasks => {
          let preparedList = tasks;

          for (let i = 0; i < preparedList.length; i++) {
            preparedList[i].formattedDate = this.dateService.format(preparedList[i].createdAt);

            let fullName = 'none';
            const assignedTo = preparedList[i].assignedTo;

            if (assignedTo !== null) {
              fullName = assignedTo.firstName + ' ' + assignedTo.lastName;
            }

            preparedList[i].fullName = fullName;
          }

          this.tasks = preparedList;
        }
      }
    );
  }

  onPaginationDataChanged(event: PageEvent) {
    this.limit = event.pageSize;
    this.offset = event.pageIndex;

    const queryParams = { limit: this.limit, offset: this.offset };

    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParams,
        queryParamsHandling: 'merge',
      }
    );

    if (this.url === 'profile') {
      this.prepareProfileData();
    } else {
      this.prepareData();
    }
  }

  onProjectChanged(project: Project|null) {
    const projectId = project ? project.id : null

    if (this.project === projectId) {
      return;
    }

    this.project = projectId;

    const queryParams = { project: this.project };

    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParams,
        queryParamsHandling: 'merge',
      }
    );

    if (this.url === 'profile') {
      this.prepareProfileData();
    } else {
      this.prepareData();
    }
  }

  onUserChanged(user: User|null) {
    const userId = user ? user.id : null

    if (this.user === userId) {
      return;
    }

    this.user = userId;

    const queryParams = { user: this.user };

    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParams,
        queryParamsHandling: 'merge',
      }
    );

    this.prepareData();
  }

  onStatusesChanged(statuses: string[]|null) {
    this.statuses = statuses;

    let statusesParam: string|null = null;

    if (statuses !== null && statuses.length > 0) {
      statusesParam = statuses.map(status => {return status.toLowerCase()}).join(',');
    }

    const queryParams = { statuses: statusesParam };

    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParams,
        queryParamsHandling: 'merge',
      }
    );

    this.prepareData();
  }
}
