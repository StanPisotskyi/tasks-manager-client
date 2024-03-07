import { TestBed } from '@angular/core/testing';

import { CommentFormStateService } from './comment-form-state.service';

describe('CommentFormStateService', () => {
  let service: CommentFormStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommentFormStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
