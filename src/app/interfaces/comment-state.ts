import {Comment} from "../interfaces/comment";

export interface CommentState {
  comment: Comment|null;
  state: string;
  token: string;
  fullPath: string
}
