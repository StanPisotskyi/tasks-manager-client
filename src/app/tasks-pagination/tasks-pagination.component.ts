import {Component, Input} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-tasks-pagination',
  standalone: true,
  imports: [
    MatPaginator
  ],
  templateUrl: './tasks-pagination.component.html',
  styleUrl: './tasks-pagination.component.css'
})
export class TasksPaginationComponent {
  @Input() total: number = 0;
  @Input() limit: number = 10;
  @Input() offset: number = 0;
  pageSizeOptions: number[] = [10, 25, 50];
}
