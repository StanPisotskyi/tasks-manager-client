import { Component } from '@angular/core';
import {TasksService} from "../services/tasks.service";
import {ListTask} from "../interfaces/list-task";
import {TasksListComponent} from "../tasks-list/tasks-list.component";
import {DateService} from "../helpers/date.service";
import {ActivatedRoute, Router} from "@angular/router";
import {TasksPaginationComponent} from "../tasks-pagination/tasks-pagination.component";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-tasks-wrapper',
  standalone: true,
  imports: [
    TasksListComponent,
    TasksPaginationComponent
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

  constructor(private tasksService: TasksService, private dateService: DateService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    let url: string = this.router.url;
    this.url = url.substring(0, url.indexOf('?')).replace(/^\//g, '');

    const limit: string|null = this.route.snapshot.queryParamMap.get('limit');
    const offset: string|null = this.route.snapshot.queryParamMap.get('offset');

    if (limit !== null) {
      this.limit = parseInt(limit);
    }

    if (offset !== null) {
      this.offset = parseInt(offset);
    }

    if (this.url === 'profile') {
      this.prepareProfileData(this.limit, this.offset);
    }
  }

  prepareProfileData(limit: number, offset: number) {
    this.tasksService.getProfileTasksCount()?.subscribe(
      {
        next: response => {
          this.total = response.total;
        }
      }
    );

    this.tasksService.getProfileTasks(limit, offset)?.subscribe(
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
      this.prepareProfileData(this.limit, this.offset);
    }
  }
}
