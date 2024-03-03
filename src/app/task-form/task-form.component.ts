import {Component, Input} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgClass, NgForOf} from "@angular/common";
import {Task} from "../interfaces/task";
import {Project} from "../interfaces/project";
import {User} from "../interfaces/user";
import {ProjectsService} from "../services/projects.service";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgClass,
    NgForOf
  ],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css'
})
export class TaskFormComponent {
  form: FormGroup;

  @Input() task: Task|null = null

  validInputClass: string = 'form-control';
  invalidInputClass: string = 'form-control is-invalid';

  statuses: string[] = ['NEW', 'IN_PROGRESS', 'TESTING', 'CLOSED'];

  projects: Project[] = [];
  users: User[] = [];

  formInitCheck: boolean = false;
  projectsInitCheck: boolean = false;

  constructor(private fb: FormBuilder, private projectsService: ProjectsService, private userService: UserService) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      status: ['NEW', Validators.required],
      project: ['', Validators.required],
      assignedTo: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.projectsService.getAll()?.subscribe(
      {
        next: projects => {
          this.projects = projects;
        }
      }
    );

    this.userService.getAll()?.subscribe(
      {
        next: users => {
          this.users = users;
        }
      }
    );
  }

  ngDoCheck() {
    if (this.projects.length > 0 && this.task === null && !this.projectsInitCheck) {
      this.projectsInitCheck = true;

      this.form.controls['project'].setValue(this.projects[0].id);
    }

    if (this.task !== null && !this.formInitCheck) {
      this.formInitCheck = true;

      this.form.controls['title'].setValue(this.task.title);
      this.form.controls['status'].setValue(this.task.status);
      this.form.controls['project'].setValue(this.task.project.id);

      if (this.task.assignedTo !== null) {
        this.form.controls['assignedTo'].setValue(this.task.assignedTo.id);
      }
    }
  }
}
