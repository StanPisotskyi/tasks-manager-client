import {Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Task} from "../interfaces/task";
import {TasksService} from "../services/tasks.service";
import {DateService} from "../helpers/date.service";
import {User} from "../interfaces/user";
import {MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle} from "@angular/material/card";

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatCardSubtitle,
    MatCardTitle
  ],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent {
  id: number = 0;
  task: Task|null = null;

  constructor(private route: ActivatedRoute, private tasksService: TasksService, private dateService: DateService) {
    const id: string|null = this.route.snapshot.paramMap.get('id');

    if (id !== null) {
      this.id = parseInt(id);
    }
  }

  ngOnInit() {
    this.tasksService.getOneById(this.id)?.subscribe(
      {
        next: task => {
          task.formattedDate = this.dateService.format(task.updatedAt === null ? task.createdAt : task.updatedAt);

          let assignedToFullName: string = 'none';
          const assignedTo: User|null = task.assignedTo;

          if (assignedTo !== null) {
            assignedToFullName = assignedTo.firstName + ' ' + assignedTo.lastName;
          }

          task.assignedToFullName = assignedToFullName;

          let createdByFullName: string = 'none';
          const createdBy: User|null = task.createdBy;

          if (createdBy !== null) {
            createdByFullName = createdBy.firstName + ' ' + createdBy.lastName;
          }

          task.createdByFullName = createdByFullName;

          this.task = task;
        }
      }
    );
  }
}
