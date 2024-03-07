import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentFormModalComponent } from './comment-form-modal.component';

describe('CommentFormModalComponent', () => {
  let component: CommentFormModalComponent;
  let fixture: ComponentFixture<CommentFormModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommentFormModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CommentFormModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
