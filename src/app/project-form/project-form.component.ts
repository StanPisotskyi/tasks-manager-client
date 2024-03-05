import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Project} from "../interfaces/project";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgClass, NgForOf} from "@angular/common";
import {ProjectsService} from "../services/projects.service";
import {Observable} from "rxjs";
import {Router} from "@angular/router";
import {FlashMessagesService} from "../helpers/flash-messages.service";
import {ProjectFormStateService} from "../helpers/project-form-state.service";

@Component({
  selector: 'app-project-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgClass,
    NgForOf
  ],
  templateUrl: './project-form.component.html',
  styleUrl: './project-form.component.css'
})
export class ProjectFormComponent {
  @Input() project: Project|null = null;

  form: FormGroup;

  validInputClass: string = 'form-control';
  invalidInputClass: string = 'form-control is-invalid';

  statuses: string[] = ['VISIBLE', 'HIDDEN'];

  formInitCheck: boolean = false;

  constructor(
    private fb: FormBuilder,
    private projectsService: ProjectsService,
    private router: Router,
    private flashMessagesService: FlashMessagesService,
    private projectFormState: ProjectFormStateService
  ) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      alias: ['', Validators.required],
      status: ['VISIBLE', Validators.required],
    });
  }

  ngDoCheck() {
    if (this.project !== null && !this.formInitCheck) {
      this.formInitCheck = true;

      this.form.controls['title'].setValue(this.project.title);
      this.form.controls['alias'].setValue(this.project.alias);
      this.form.controls['status'].setValue(this.project.status);
    }
  }

  save() {
    for (let field in this.form.controls) {
      this.form.controls[field].setErrors(null);
    }

    const form = this.form.value;

    if (form.title && form.alias) {
      let observable: Observable<Project>|null;
      let state: string|null;

      if (this.project === null) {
        observable = this.create(form.title, form.alias, form.status);
        state = 'created';
      } else {
        observable = this.edit(this.project.id, form.title, form.alias, form.status);
        state = 'edited';
      }

      observable?.subscribe(
        {
          next: project => {
            this.projectFormState.setState(state);
            this.router.navigate(['/admin/projects']);
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

  private create(title: string, alias: string, status: string): Observable<Project>|null {
    return this.projectsService.create(title, alias, status);
  }

  private edit(id: number, title: string, alias: string, status: string): Observable<Project>|null {
    return this.projectsService.edit(id, title, alias, status);
  }
}
