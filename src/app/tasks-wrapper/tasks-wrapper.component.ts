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
  lastSelectedProject: Project|null = null;
  project: number|null = null;

  constructor(
    private tasksService: TasksService,
    private dateService: DateService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    let url: string = this.router.url.replace(/^\//g, '');
    const preparedUrl: string = url.substring(0, url.indexOf('?'));

    this.url = preparedUrl === '' ? url : preparedUrl;

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
    }
  }

  prepareProfileData() {
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
    }
  }

  onProjectChanged(project: Project|null) {
    if (this.lastSelectedProject?.id === project?.id) {
      return;
    }

    this.lastSelectedProject = project;
    this.project = project ? project.id : null;

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
    }
  }
}
