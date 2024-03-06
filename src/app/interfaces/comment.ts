import {User} from "./user";

export interface Comment {
  id: number
  text: string,
  createdAt: string|null,
  updatedAt: string|null,
  createdBy: User|null,
  replyId: number|null,
  children: Comment[]|null,
  formattedDate: string|null,
  fullName: string,
  isAuthor: boolean
}
