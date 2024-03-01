import {Component, Input} from '@angular/core';
import {ListTask} from "../interfaces/list-task";
import {MatCard, MatCardActions, MatCardHeader, MatCardSubtitle, MatCardTitle} from "@angular/material/card";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-tasks-list',
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardActions,
    MatCardSubtitle,
    MatCardTitle,
    NgForOf
  ],
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.css'
})
export class TasksListComponent {
  @Input() tasks: ListTask[] = [];
}
