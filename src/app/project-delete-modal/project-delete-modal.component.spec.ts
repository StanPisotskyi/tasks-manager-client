import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectDeleteModalComponent } from './project-delete-modal.component';

describe('ProjectDeleteModalComponent', () => {
  let component: ProjectDeleteModalComponent;
  let fixture: ComponentFixture<ProjectDeleteModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectDeleteModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProjectDeleteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
