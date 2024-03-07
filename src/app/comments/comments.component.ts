import {Component, Input} from '@angular/core';
import {Comment} from "../interfaces/comment";
import {CommentNode} from "../interfaces/comment-node";
import {
  MatNestedTreeNode,
  MatTree, MatTreeFlatDataSource, MatTreeFlattener,
  MatTreeNode,
  MatTreeNodeDef,
  MatTreeNodeOutlet, MatTreeNodePadding,
  MatTreeNodeToggle
} from "@angular/material/tree";
import {MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {FlatTreeControl} from '@angular/cdk/tree';
import {CommentComponent} from "../comment/comment.component";
import {MatDialog} from "@angular/material/dialog";
import {CommentFormModalComponent} from "../comment-form-modal/comment-form-modal.component";

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [
    MatTree,
    MatTreeNode,
    MatNestedTreeNode,
    MatTreeNodeDef,
    MatIconButton,
    MatTreeNodeToggle,
    MatIcon,
    MatTreeNodeOutlet,
    MatTreeNodePadding,
    CommentComponent
  ],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css'
})
export class CommentsComponent {
  @Input() comments: Comment[] = [];
  @Input() taskId: number = 0;

  constructor(private dialog: MatDialog) {
  }

  private _transformer = (node: Comment, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      text: node.text,
      level: level,
      id: node.id,
      replyId: node.replyId,
      formattedDate: node.formattedDate,
      fullName: node.fullName,
      isAuthor: node.isAuthor
    };
  };

  treeControl = new FlatTreeControl<CommentNode>(
    node => node.level,
    node => node.expandable,
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.children,
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  ngOnInit() {
    this.dataSource.data = this.comments;
  }

  hasChild = (_: number, node: CommentNode) => node.expandable;

  showCommentForm() {
    this.dialog.open(CommentFormModalComponent, {
      width: '700px',
      height: '500px',
      data: {comment: null, reply: null, taskId: this.taskId}
    });
  }
}
