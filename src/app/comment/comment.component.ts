import {Component, Input} from '@angular/core';
import {CommentNode} from "../interfaces/comment-node";
import {MatIcon} from "@angular/material/icon";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [
    MatIcon,
    NgIf
  ],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css'
})
export class CommentComponent {
  @Input() comment: CommentNode|null = null;
}
