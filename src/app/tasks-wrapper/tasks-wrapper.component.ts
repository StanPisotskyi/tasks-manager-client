import { Component } from '@angular/core';
import {TasksService} from "../services/tasks.service";
import {ListTask} from "../interfaces/list-task";
import {TasksListComponent} from "../tasks-list/tasks-list.component";
import {DateService} from "../helpers/date.service";
import {ActivatedRoute, Router} from "@angular/router";
import {TasksPaginationComponent} from "../tasks-pagination/tasks-pagination.component";
import {PageEvent} from "@angular/material/paginator";
import {TasksFiltersComponent} from "../tasks-filters/tasks-filters.component";
import {Project} from "../interfaces/project";
import {UrlService} from "../helpers/url.service";

@Component({
  selector: 'app-tasks-wrapper',
  standalone: true,
  imports: [
    TasksListComponent,
    TasksPaginationComponent,
    TasksFiltersComponent
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

    if (limit !== null) {
      this.limit = parseInt(limit);
    }

    if (offset !== null) {
      this.offset = parseInt(offset);
    }

    if (project !== null) {
      this.project = parseInt(project);
    }

    if (this.url === 'profile') {
      this.prepareProfileData();
    } else {
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
    this.tasksService.getTasksCount(this.project)?.subscribe(
      {
        next: response => {
          this.total = response.total;
        }
      }
    );

    this.tasksService.getTasks(this.limit, this.offset, this.project)?.subscribe(
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
}
