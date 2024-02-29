import { Component } from '@angular/core';
import {TasksService} from "../services/tasks.service";

@Component({
  selector: 'app-tasks-wrapper',
  standalone: true,
  imports: [],
  templateUrl: './tasks-wrapper.component.html',
  styleUrl: './tasks-wrapper.component.css'
})
export class TasksWrapperComponent {
  total: number = 0;

  constructor(private tasksService: TasksService) {
  }

  ngOnInit() {
    this.tasksService.getProfileTasksCount()?.subscribe(
      {
        next: response => {
          this.total = response.total;
        }
      }
    );
  }
}
