import {Component, Inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef
} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";
import {TasksService} from "../services/tasks.service";
import {FlashMessagesService} from "../helpers/flash-messages.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-task-delete-modal',
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogActions,
    MatButton,
    MatDialogClose
  ],
  templateUrl: './task-delete-modal.component.html',
  styleUrl: './task-delete-modal.component.css'
})
export class TaskDeleteModalComponent {
  constructor(
    private dialogRef: MatDialogRef<TaskDeleteModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private tasksService: TasksService,
    private flashMessagesService: FlashMessagesService,
    private router: Router
  ) {
  }

  delete() {
    this.tasksService.delete(this.data.id)?.subscribe(
      {
        next: response => {
          this.dialogRef.close();
          this.router.navigate(['/tasks']);
        },
        error: response => {
          this.flashMessagesService.showMessage('Something went wrong...');
        }
      }
    );
  }
}
