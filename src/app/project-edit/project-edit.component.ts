import { Component } from '@angular/core';
import {Project} from "../interfaces/project";
import {ProjectsService} from "../services/projects.service";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {MatAnchor} from "@angular/material/button";
import {ProjectFormComponent} from "../project-form/project-form.component";

@Component({
  selector: 'app-project-edit',
  standalone: true,
  imports: [
    MatAnchor,
    ProjectFormComponent,
    RouterLink
  ],
  templateUrl: './project-edit.component.html',
  styleUrl: './project-edit.component.css'
})
export class ProjectEditComponent {
  id: number = 0;
  project: Project|null = null;

  constructor(private projectsService: ProjectsService, private route: ActivatedRoute) {
    const id: string|null = this.route.snapshot.paramMap.get('id');

    if (id !== null) {
      this.id = parseInt(id);
    }
  }

  ngOnInit() {
    this.projectsService.getOneById(this.id)?.subscribe(
      {
        next: project => {
          this.project = project;
        }
      }
    );
  }
}
