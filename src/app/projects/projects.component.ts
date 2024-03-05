import {Component} from '@angular/core';
import {Project} from "../interfaces/project";
import {ProjectsService} from "../services/projects.service";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable
} from "@angular/material/table";
import {DateService} from "../helpers/date.service";
import {MatAnchor, MatButton} from "@angular/material/button";
import {RouterLink} from "@angular/router";
import {FlashMessagesService} from "../helpers/flash-messages.service";
import {ProjectFormStateService} from "../helpers/project-form-state.service";
import {MatDialog} from "@angular/material/dialog";
import {ProjectDeleteModalComponent} from "../project-delete-modal/project-delete-modal.component";
import {ProjectDeleteStateService} from "../helpers/project-delete-state.service";

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
    MatButton,
    RouterLink
  ],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent {
  projects: Project[] = [];
  displayedColumns: string[] = ['id', 'title', 'alias', 'status', 'formattedDate', 'createdBy', 'actions'];
  private deletedIds: number[] = [];

  constructor(
    private projectsService: ProjectsService,
    private dateService: DateService,
    private flashMessagesService: FlashMessagesService,
    private projectFormState: ProjectFormStateService,
    private dialog: MatDialog,
    private projectDeleteState: ProjectDeleteStateService
  ) {
    this.projectFormState.state$.subscribe(state => {
      if (state === null) {
        return;
      }

      let message: string = '';

      if (state === 'created') {
        message = 'Project has been created!';
      } else if (state === 'edited') {
        message = 'Project has been edited!';
      }

      this.flashMessagesService.showMessage(message);
    });
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

  ngDoCheck() {
    this.projectDeleteState.id$.subscribe(id => {
      if (!this.deletedIds.includes(id)) {
        this.deletedIds.push(id);
        this.projects = this.projects.filter(project => project.id !== id);
        this.flashMessagesService.showMessage('Project has been deleted!');
      }
    });
  }

  confirmDelete(id: number) {
    this.dialog.open(ProjectDeleteModalComponent, {
      width: '250px',
      data: { id }
    });
  }
}
