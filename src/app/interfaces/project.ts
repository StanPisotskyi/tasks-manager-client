import {User} from "./user";

export interface Project {
  id: number;
  title: string;
  alias: string;
  status: string;
  createdAt: string,
  createdBy: User,
  formattedDate: string,
  fullName: string,
}
