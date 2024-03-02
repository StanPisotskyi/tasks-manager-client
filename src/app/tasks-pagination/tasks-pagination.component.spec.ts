import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksPaginationComponent } from './tasks-pagination.component';

describe('TasksPaginationComponent', () => {
  let component: TasksPaginationComponent;
  let fixture: ComponentFixture<TasksPaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TasksPaginationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TasksPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
