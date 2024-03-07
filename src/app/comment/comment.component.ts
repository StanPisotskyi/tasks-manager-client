import {Component, Input} from '@angular/core';
import {CommentNode} from "../interfaces/comment-node";
import {NgIf} from "@angular/common";

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
}
