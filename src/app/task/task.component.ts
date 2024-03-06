import {Component} from '@angular/core';
import {ActivatedRoute, RouterLink} from "@angular/router";
import {Task} from "../interfaces/task";
import {TasksService} from "../services/tasks.service";
import {DateService} from "../helpers/date.service";
import {User} from "../interfaces/user";
import {MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle} from "@angular/material/card";
import {MatAnchor, MatButton} from "@angular/material/button";
import {MatDialog} from "@angular/material/dialog";
import {TaskDeleteModalComponent} from "../task-delete-modal/task-delete-modal.component";
import {CommentsService} from "../services/comments.service";
import {Comment} from "../interfaces/comment";
import {StorageService} from "../services/storage.service";
import {NgIf} from "@angular/common";
import {CommentsComponent} from "../comments/comments.component";

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatCardSubtitle,
    MatCardTitle,
    MatAnchor,
    RouterLink,
    MatButton,
    NgIf,
    CommentsComponent
  ],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent {
  id: number = 0;
  task: Task|null = null;
  comments: Comment[] = [];

  constructor(
    private route: ActivatedRoute,
    private tasksService: TasksService,
    private dateService: DateService,
    private dialog: MatDialog,
    private commentsService: CommentsService,
    private storage: StorageService
  ) {
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

    this.commentsService.getAllByTaskId(this.id)?.subscribe(
      {
        next: comments => {
          this.comments = this.prepareComments(comments);
        }
      }
    );
  }

  confirmDelete() {
    this.dialog.open(TaskDeleteModalComponent, {
      width: '250px',
      data: {id: this.task ? this.task.id : 0}
    });
  }

  private prepareComments(comments: Comment[]): Comment[] {
    for (let i = 0; i < comments.length; i++) {
      let dateToFormat: string|null = comments[i].updatedAt === null ? comments[i].createdAt : comments[i].updatedAt;

      if (dateToFormat !== null) {
        comments[i].formattedDate = this.dateService.format(dateToFormat);
      }

      let fullName = 'deleted';
      const assignedTo = comments[i].createdBy;

      let isAuthor: boolean = false;

      if (assignedTo !== null) {
        fullName = assignedTo.firstName + ' ' + assignedTo.lastName;
        isAuthor = assignedTo.id === this.storage.getCurrentUser()?.id;
      }

      comments[i].fullName = fullName;
      comments[i].isAuthor = isAuthor;

      const children: Comment[]|null = comments[i].children;

      if (children !== null) {
        this.prepareComments(children);
      }
    }

    return comments;
  }
}
