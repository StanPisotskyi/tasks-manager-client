import { Component } from '@angular/core';
import {Project} from "../interfaces/project";
import {ProjectsService} from "../services/projects.service";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef, MatHeaderRow,
  MatHeaderRowDef, MatRow, MatRowDef,
  MatTable
} from "@angular/material/table";
import {DateService} from "../helpers/date.service";
import {MatAnchor, MatButton} from "@angular/material/button";

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatHeaderCellDef,
    MatCellDef,
    MatHeaderRowDef,
    MatRowDef,
    MatHeaderRow,
    MatRow,
    MatAnchor,
    MatButton
  ],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent {
  projects: Project[] = [];
  displayedColumns: string[] = ['id', 'title', 'alias', 'formattedDate', 'createdBy', 'actions'];

  constructor(private projectsService: ProjectsService, private dateService: DateService) {
  }

  ngOnInit() {
    this.projectsService.getAll()?.subscribe(
      {
        next: projects => {
          let preparedList = projects;

          for (let i = 0; i < preparedList.length; i++) {
            preparedList[i].formattedDate = this.dateService.format(preparedList[i].createdAt);

            let fullName = '-';
            const createdBy = preparedList[i].createdBy;

            if (createdBy !== null) {
              fullName = createdBy.firstName + ' ' + createdBy.lastName;
            }

            preparedList[i].fullName = fullName;
          }

          this.projects = projects;
        }
      }
    );
  }
}
