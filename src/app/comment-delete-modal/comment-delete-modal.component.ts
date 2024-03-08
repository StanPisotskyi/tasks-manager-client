import {Component, Inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef
} from "@angular/material/dialog";
import {CommentsService} from "../services/comments.service";
import {FlashMessagesService} from "../helpers/flash-messages.service";
import {CommentFormStateService} from "../helpers/comment-form-state.service";
import {CommentState} from "../interfaces/comment-state";
import {StorageService} from "../services/storage.service";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-comment-delete-modal',
  standalone: true,
  imports: [
    MatButton,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent
  ],
  templateUrl: './comment-delete-modal.component.html',
  styleUrl: './comment-delete-modal.component.css'
})
export class CommentDeleteModalComponent {
  constructor(
    private dialogRef: MatDialogRef<CommentDeleteModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private commentsService: CommentsService,
    private flashMessagesService: FlashMessagesService,
    private commentsFormState: CommentFormStateService,
    private storage: StorageService
  ) {
  }

  delete() {
    this.commentsService.delete(this.data.comment.id)?.subscribe(
      {
        next: response => {
          const commentState: CommentState = {
            comment: null,
            state: 'deleted',
            token: '' + new Date().getTime() + this.storage.getCurrentUser()?.id + this.data.comment.id,
            fullPath: this.data.comment.fullPath

          };
          this.dialogRef.close();
          this.commentsFormState.setData(commentState);
        },
        error: response => {
          this.flashMessagesService.showMessage('Something went wrong...');
        }
      }
    );
  }
}
