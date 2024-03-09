export interface CommentNode {
  expandable: boolean;
  text: string;
  level: number;
  id: number;
  replyId: number|null;
  formattedDate: string|null;
  fullName: string;
  isAuthor: boolean;
  fullPath: string|null;
  isDeleted: boolean;
}
