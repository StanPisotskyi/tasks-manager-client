import { Component } from '@angular/core';
import {TaskFormComponent} from "../task-form/task-form.component";
import {Task} from "../interfaces/task";
import {MatAnchor} from "@angular/material/button";
import {RouterLink} from "@angular/router";
import {FlashMessagesService} from "../helpers/flash-messages.service";

@Component({
  selector: 'app-task-create',
  standalone: true,
  imports: [
    TaskFormComponent,
    MatAnchor,
    RouterLink
  ],
  templateUrl: './task-create.component.html',
  styleUrl: './task-create.component.css'
})
export class TaskCreateComponent {
  task: Task|null = null;

  constructor(private flashMessagesService: FlashMessagesService) {
  }

  onFormSaved(isSaved: boolean) {
    if (isSaved) {
      this.flashMessagesService.showMessage('Task has been created!');
    }
  }
}
