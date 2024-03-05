import {Component, Inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef
} from "@angular/material/dialog";
import {ProjectsService} from "../services/projects.service";
import {FlashMessagesService} from "../helpers/flash-messages.service";
import {MatButton} from "@angular/material/button";
import {ProjectDeleteStateService} from "../helpers/project-delete-state.service";

@Component({
  selector: 'app-project-delete-modal',
  standalone: true,
  imports: [
    MatButton,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent
  ],
  templateUrl: './project-delete-modal.component.html',
  styleUrl: './project-delete-modal.component.css'
})
export class ProjectDeleteModalComponent {
  constructor(
    private dialogRef: MatDialogRef<ProjectDeleteModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private projectsService: ProjectsService,
    private flashMessagesService: FlashMessagesService,
    private projectDeleteState: ProjectDeleteStateService
  ) {
  }

  delete() {
    this.projectsService.delete(this.data.id)?.subscribe(
      {
        next: response => {
          this.dialogRef.close();
          this.projectDeleteState.setId(this.data.id);
        },
        error: response => {
          this.flashMessagesService.showMessage('Something went wrong...');
        }
      }
    );
  }
}
