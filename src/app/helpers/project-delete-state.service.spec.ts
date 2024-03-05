import { TestBed } from '@angular/core/testing';

import { ProjectDeleteStateService } from './project-delete-state.service';

describe('ProjectDeleteStateService', () => {
  let service: ProjectDeleteStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectDeleteStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
