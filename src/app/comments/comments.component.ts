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
      isAuthor: node.isAuthor,
      fullPath: node.fullPath
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
          this.comments = this.prepareComments(comments, '');
          this.dataSource.data = this.comments;
        }
      }
    );
  }

  ngDoCheck() {
    this.commentsFormState.data$.subscribe(commentState => {
      if (!this.finishedActions.includes(commentState.token)) {
        this.finishedActions.push(commentState.token);

        if (commentState.comment !== null) {
          let preparedComment = this.prepareComment(commentState.comment);

          if (commentState.state === 'created') {
            preparedComment.fullPath = '' + this.comments.length;
            this.comments.push(preparedComment);
          } else if (commentState.state === 'edited') {
            const indexes = commentState.fullPath.split('-');

            let objectToUpdate: Comment|null = null;

            for (let i = 0; i < indexes.length; i++) {
              const currentIndex: number = parseInt(indexes[i]);

              if (objectToUpdate !== null && objectToUpdate.hasOwnProperty('children') && objectToUpdate.children !== null) {
                objectToUpdate = objectToUpdate.children[currentIndex];
              } else {
                objectToUpdate = this.comments[currentIndex];
              }
            }

            if (objectToUpdate !== null) {
              objectToUpdate.text = preparedComment.text;
              objectToUpdate.formattedDate = preparedComment.formattedDate;
            }
          } else if (commentState.state === 'replied') {
            const indexes = commentState.fullPath.split('-');

            let parent: Comment|null = null;

            for (let i = 0; i < indexes.length; i++) {
              const currentIndex: number = parseInt(indexes[i]);

              if (parent !== null && parent.hasOwnProperty('children') && parent.children !== null) {
                parent = parent.children[currentIndex];
              } else {
                parent = this.comments[currentIndex];
              }
            }

            if (parent !== null) {
              if (parent.children === null) {
                parent.children = [];
              }

              preparedComment.fullPath = commentState.fullPath + '-' + parent.children.length;

              parent.children.push(preparedComment);
            }
          }

          this.dataSource.data = this.comments;
        }
      }
    });
  }

  hasChild = (_: number, node: CommentNode) => node.expandable;

  private prepareComments(comments: Comment[], fullPath: string): Comment[] {
    for (let i = 0; i < comments.length; i++) {
      comments[i] = this.prepareComment(comments[i]);

      const children: Comment[]|null = comments[i].children;

      let separator: string = '';

      if (fullPath !== '') {
        separator = '-';
      }

      const currentFullPath = fullPath + separator + i;

      comments[i].fullPath = currentFullPath;

      if (children !== null) {
        this.prepareComments(children, currentFullPath);
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
