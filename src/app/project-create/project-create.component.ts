import { Component } from '@angular/core';
import {MatAnchor} from "@angular/material/button";
import {RouterLink} from "@angular/router";
import {ProjectFormComponent} from "../project-form/project-form.component";
import {Project} from "../interfaces/project";

@Component({
  selector: 'app-project-create',
  standalone: true,
  imports: [
    MatAnchor,
    RouterLink,
    ProjectFormComponent
  ],
  templateUrl: './project-create.component.html',
  styleUrl: './project-create.component.css'
})
export class ProjectCreateComponent {
  project: Project|null = null;
}
