import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgClass, NgForOf} from "@angular/common";
import {Task} from "../interfaces/task";
import {Project} from "../interfaces/project";
import {User} from "../interfaces/user";
import {ProjectsService} from "../services/projects.service";
import {UserService} from "../services/user.service";
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {CKEditorModule} from "@ckeditor/ckeditor5-angular";
import {Observable} from "rxjs";
import {TasksService} from "../services/tasks.service";
import {Router} from "@angular/router";
import {FlashMessagesService} from "../helpers/flash-messages.service";

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgClass,
    NgForOf,
    CKEditorModule
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

  ckEditor = ClassicEditor;

  @Output() isSaved = new EventEmitter<boolean>();

  constructor(
    private fb: FormBuilder,
    private projectsService: ProjectsService,
    private userService: UserService,
    private tasksService: TasksService,
    private router: Router,
    private flashMessagesService: FlashMessagesService
  ) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      status: ['NEW', Validators.required],
      projectId: ['', Validators.required],
      assignedToId: ['', Validators.required]
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

      this.form.controls['projectId'].setValue(this.projects[0].id);
    }

    if (this.task !== null && !this.formInitCheck) {
      this.formInitCheck = true;

      this.form.controls['title'].setValue(this.task.title);
      this.form.controls['description'].setValue(this.task.description);
      this.form.controls['status'].setValue(this.task.status);
      this.form.controls['projectId'].setValue(this.task.project.id);

      if (this.task.assignedTo !== null) {
        this.form.controls['assignedToId'].setValue(this.task.assignedTo.id);
      }
    }
  }

  save() {
    for (let field in this.form.controls) {
      this.form.controls[field].setErrors(null);
    }

    const form = this.form.value;

    if (form.title && form.description) {
      let observable: Observable<Task>|null;

      if (this.task === null) {
        observable = this.create(form.title, form.description, form.status, form.projectId, form.assignedToId);
      } else {
        observable = this.edit(this.task.id, form.title, form.description, form.status, form.projectId, form.assignedToId);
      }

      observable?.subscribe(
        {
          next: task => {
            this.isSaved.emit(true);
            this.router.navigate(['/tasks', task.id]);
          },
          error: response => {
            if (response.status === 400) {
              const errors = response.error.errors;
              for (let field in errors) {
                this.form.controls[field].setErrors({invalid: errors[field]});
              }
            } else {
              this.flashMessagesService.showMessage('Something went wrong...');
            }
          }
        }
      );
    }
  }

  private create(title: string, description: string, status: string, projectId: number, assignedToId: number): Observable<Task>|null {
    return this.tasksService.create(title, description, status, projectId, assignedToId);
  }

  private edit(id: number, title: string, description: string, status: string, projectId: number, assignedToId: number): Observable<Task>|null {
    return this.tasksService.edit(id, title, description, status, projectId, assignedToId)
  }
}
