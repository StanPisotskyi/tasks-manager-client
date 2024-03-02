import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatPaginator, PageEvent} from "@angular/material/paginator";

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
  @Output() paginationData = new EventEmitter<PageEvent>();
  pageSizeOptions: number[] = [10, 25, 50];

  onPaginationDataChanged(event: PageEvent) {
    this.paginationData.emit(event);
  }
}
