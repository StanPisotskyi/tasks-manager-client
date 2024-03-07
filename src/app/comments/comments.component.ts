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
import {StorageService} from "../services/storage.service";
import {CommentFormStateService} from "../helpers/comment-form-state.service";
import {CommentsService} from "../services/comments.service";
import {DateService} from "../helpers/date.service";

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
  @Input() taskId: number = 0;
  comments: Comment[] = [];

  private finishedActions: string[] = [];

  constructor(
    private storage: StorageService,
    private commentsFormState: CommentFormStateService,
    private commentsService: CommentsService,
    private dateService: DateService
  ) {
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
    this.commentsService.getAllByTaskId(this.taskId)?.subscribe(
      {
        next: comments => {
          this.comments = this.prepareComments(comments);
          this.dataSource.data = this.comments;
        }
      }
    );
  }

  ngDoCheck() {
    this.commentsFormState.data$.subscribe(commentState => {
      if (!this.finishedActions.includes(commentState.token)) {
        this.finishedActions.push(commentState.token);

        if (commentState.comment !== null && commentState.state === 'created') {
          this.comments.push(this.prepareComment(commentState.comment));
          this.dataSource.data = this.comments;
        }
      }
    });
  }

  hasChild = (_: number, node: CommentNode) => node.expandable;

  private prepareComments(comments: Comment[]): Comment[] {
    for (let i = 0; i < comments.length; i++) {
      comments[i] = this.prepareComment(comments[i]);

      const children: Comment[]|null = comments[i].children;

      if (children !== null) {
        this.prepareComments(children);
      }
    }

    return comments;
  }

  private prepareComment(comment: Comment): Comment {
    let dateToFormat: string|null = comment.updatedAt === null ? comment.createdAt : comment.updatedAt;

    if (dateToFormat !== null) {
      comment.formattedDate = this.dateService.format(dateToFormat);
    }

    let fullName = 'deleted';
    const assignedTo = comment.createdBy;

    let isAuthor: boolean = false;

    if (assignedTo !== null) {
      fullName = assignedTo.firstName + ' ' + assignedTo.lastName;
      isAuthor = assignedTo.id === this.storage.getCurrentUser()?.id;
    }

    comment.fullName = fullName;
    comment.isAuthor = isAuthor;

    return comment;
  }
}
