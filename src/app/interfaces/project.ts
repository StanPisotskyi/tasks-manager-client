import {User} from "./user";

export interface Project {
  id: number;
  title: string;
  alias: string;
  status: string;
  createdAt: Date,
  createdBy: User
}
