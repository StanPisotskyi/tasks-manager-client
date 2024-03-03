import { Component } from '@angular/core';
import {Task} from "../interfaces/task";
import {TasksService} from "../services/tasks.service";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {MatAnchor} from "@angular/material/button";
import {TaskFormComponent} from "../task-form/task-form.component";
import {FlashMessagesService} from "../helpers/flash-messages.service";

@Component({
  selector: 'app-task-edit',
  standalone: true,
  imports: [
    MatAnchor,
    TaskFormComponent,
    RouterLink
  ],
  templateUrl: './task-edit.component.html',
  styleUrl: './task-edit.component.css'
})
export class TaskEditComponent {
  id: number = 0;
  task: Task|null = null;

  constructor(private tasksService: TasksService, private route: ActivatedRoute, private flashMessagesService: FlashMessagesService) {
    const id: string|null = this.route.snapshot.paramMap.get('id');

    if (id !== null) {
      this.id = parseInt(id);
    }
  }

  ngOnInit() {
    this.tasksService.getOneById(this.id)?.subscribe(
      {
        next: task => {
          this.task = task;
        }
      }
    );
  }

  onFormSaved(isSaved: boolean) {
    if (isSaved) {
      this.flashMessagesService.showMessage('Task has been edited!');
    }
  }
}
