import {Component, Input} from '@angular/core';
import {CommentNode} from "../interfaces/comment-node";
import {NgIf} from "@angular/common";
import {MatDialog} from "@angular/material/dialog";
import {CommentFormModalComponent} from "../comment-form-modal/comment-form-modal.component";
import {CommentDeleteModalComponent} from "../comment-delete-modal/comment-delete-modal.component";

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css'
})
export class CommentComponent {
  @Input() comment: CommentNode|null = null;

  constructor(private dialog: MatDialog) {
  }

  showCommentForm(comment: CommentNode|null, reply: number|null, fullPath: string|null) {
    this.dialog.open(CommentFormModalComponent, {
      width: '700px',
      height: '500px',
      data: { comment, reply, taskId: null, fullPath }
    });
  }

  confirmDelete(comment: CommentNode|null) {
    this.dialog.open(CommentDeleteModalComponent, {
      width: '250px',
      data: { comment }
    });
  }
}
