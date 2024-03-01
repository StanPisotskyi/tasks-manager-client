import {User} from "./user";
import {Project} from "./project";

export interface ListTask {
  id: number;
  title: string;
  status: string;
  createdAt: Date,
  assignedTo: User,
  project: Project
}
