import {User} from "./user";
import {Project} from "./project";

export interface ListTask {
  id: number;
  title: string;
  status: string;
  createdAt: string,
  formattedDate: string,
  assignedTo: User,
  project: Project
}
