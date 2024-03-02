import {Component, EventEmitter, Output} from '@angular/core';
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatAutocomplete, MatAutocompleteTrigger, MatOption} from "@angular/material/autocomplete";
import {Project} from "../interfaces/project";
import {MatInput} from "@angular/material/input";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {map, Observable, startWith} from "rxjs";
import {AsyncPipe} from "@angular/common";
import {ProjectsService} from "../services/projects.service";

@Component({
  selector: 'app-tasks-filters',
  standalone: true,
  imports: [
    MatFormField,
    MatAutocomplete,
    MatOption,
    MatInput,
    ReactiveFormsModule,
    MatLabel,
    MatAutocompleteTrigger,
    AsyncPipe
  ],
  templateUrl: './tasks-filters.component.html',
  styleUrl: './tasks-filters.component.css'
})
export class TasksFiltersComponent {
  projects: Project[] = [];
  filteredProjects: Observable<Project[]> = new Observable<Project[]>();
  projectsFilter: FormControl<string | Project | null> = new FormControl<string | Project>('');
  @Output() selectedProject = new EventEmitter<Project|null>;

  constructor(private projectsService: ProjectsService) {
  }

  ngOnInit() {
    this.projectsService.getAll()?.subscribe(
      {
        next: projects => {
          this.projects = projects;

          this.filteredProjects = this.projectsFilter.valueChanges.pipe(
            startWith(''),
            map(project => {
              const title = typeof project === 'string' ? project : project?.title;
              return title ? this.filterProject(title as string) : this.projects.slice();
            }),
          );
        }
      }
    );
  }

  displayProject(project: Project): string {
    return project && project.title ? project.title : '';
  }

  onProjectChanged(project: Project) {
    this.selectedProject.emit(project);
  }

  resetProject() {
    if (this.projectsFilter.value !== '') {
      return;
    }

    this.selectedProject.emit(null);
  }

  private filterProject(title: string): Project[] {
    const filterValue = title.toLowerCase();

    return this.projects.filter(option => option.title.toLowerCase().includes(filterValue));
  }
}
