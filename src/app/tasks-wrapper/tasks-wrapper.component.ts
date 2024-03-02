import { Component } from '@angular/core';
import {TasksService} from "../services/tasks.service";
import {ListTask} from "../interfaces/list-task";
import {TasksListComponent} from "../tasks-list/tasks-list.component";
import {DateService} from "../helpers/date.service";
import {Router} from "@angular/router";
import {TasksPaginationComponent} from "../tasks-pagination/tasks-pagination.component";

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

  constructor(private tasksService: TasksService, private dateService: DateService, private router: Router) {
  }

  ngOnInit() {
    let url: string = this.router.url;
    url = url.substring(0, url.indexOf('?')).replace(/^\//g, '');

    if (url === 'profile') {
      this.prepareProfileData();
    }
  }

  prepareProfileData() {
    this.tasksService.getProfileTasksCount()?.subscribe(
      {
        next: response => {
          this.total = response.total;
        }
      }
    );

    this.tasksService.getProfileTasks()?.subscribe(
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
}
