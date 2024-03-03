import {User} from "./user";
import {Project} from "./project";

export interface Task {
  id: number;
  title: string;
  status: string;
  createdAt: string,
  updatedAt: string,
  formattedDate: string,
  assignedTo: User|null,
  project: Project,
  assignedToFullName: string|null,
  description: string,
  createdBy: User|null,
  createdByFullName: string|null,
}
