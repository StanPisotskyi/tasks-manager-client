import { Component } from '@angular/core';
import {TasksService} from "../services/tasks.service";
import {ListTask} from "../interfaces/list-task";

@Component({
  selector: 'app-tasks-wrapper',
  standalone: true,
  imports: [],
  templateUrl: './tasks-wrapper.component.html',
  styleUrl: './tasks-wrapper.component.css'
})
export class TasksWrapperComponent {
  total: number = 0;
  tasks: ListTask[] = [];

  constructor(private tasksService: TasksService) {
  }

  ngOnInit() {
    this.prepareData();
  }

  prepareData() {
    this.tasksService.getProfileTasksCount()?.subscribe(
      {
        next: response => {
          this.total = response.total;
          this.tasksService.getProfileTasks()?.subscribe(
            {
              next: tasks => {
                this.tasks = tasks;
              }
            }
          );
        }
      }
    );
  }
}
