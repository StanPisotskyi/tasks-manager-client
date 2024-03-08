import {Component, Inject} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef
} from "@angular/material/dialog";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {CKEditorModule} from "@ckeditor/ckeditor5-angular";
import {NgClass, NgForOf} from "@angular/common";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import {Observable} from "rxjs";
import {Comment} from "../interfaces/comment";
import {CommentsService} from "../services/comments.service";
import {FlashMessagesService} from "../helpers/flash-messages.service";
import {CommentFormStateService} from "../helpers/comment-form-state.service";
import {CommentState} from "../interfaces/comment-state";
import {StorageService} from "../services/storage.service";

@Component({
  selector: 'app-comment-form-modal',
  standalone: true,
  imports: [
    MatButton,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    CKEditorModule,
    NgForOf,
    ReactiveFormsModule,
    NgClass
  ],
  templateUrl: './comment-form-modal.component.html',
  styleUrl: './comment-form-modal.component.css'
})
export class CommentFormModalComponent {
  form: FormGroup;

  validInputClass: string = 'form-control';
  invalidInputClass: string = 'form-control is-invalid';

  ckEditor = ClassicEditor;

  constructor(
    private dialogRef: MatDialogRef<CommentFormModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private commentsService: CommentsService,
    private flashMessagesService: FlashMessagesService,
    private commentsFormState: CommentFormStateService,
    private storage: StorageService
  ) {
    this.form = this.fb.group({
      text: [this.data?.comment?.text, Validators.required]
    });
  }

  save() {
    for (let field in this.form.controls) {
      this.form.controls[field].setErrors(null);
    }

    const form = this.form.value;

    if (form.text) {
      let observable: Observable<Comment>|null;
      let state: string = '';

      if (this.data.taskId !== null && this.data.comment === null && this.data.reply === null) {
        observable = this.create(form.text, this.data.taskId);
        state = 'created';
      } else if (this.data.taskId === null && this.data.comment === null && this.data.reply !== null) {
        observable = this.reply(form.text, this.data.reply);
        state = 'replied';
      } else if (this.data.taskId === null && this.data.comment !== null && this.data.reply === null) {
        observable = this.edit(form.text, this.data.comment.id);
        state = 'edited';
      } else {
        observable = null;
      }

      observable?.subscribe(
        {
          next: comment => {
            let fullPath = null;

            if (this.data.comment !== null) {
              fullPath = this.data.comment.fullPath;
            }

            const commentState: CommentState = {
              comment: comment,
              state: state,
              token: '' + new Date().getTime() + this.storage.getCurrentUser()?.id + comment.id,
              fullPath: fullPath
            };

            this.commentsFormState.setData(commentState);
            this.dialogRef.close();
          },
          error: response => {
            if (response.status === 400) {
              const errors = response.error.errors;
              for (let field in errors) {
                this.form.controls[field].setErrors({invalid: errors[field]});
              }
            } else {
              this.flashMessagesService.showMessage('Something went wrong...');
            }
          }
        }
      );
    }
  }

  private create(text: string, taskId: number): Observable<Comment>|null {
    return this.commentsService.create(text, taskId);
  }

  private reply(text: string, replyId: number): Observable<Comment>|null {
    return this.commentsService.reply(text, replyId);
  }

  private edit(text: string, id: number): Observable<Comment>|null {
    return this.commentsService.edit(text, id);
  }
}
