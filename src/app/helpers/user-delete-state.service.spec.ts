import { TestBed } from '@angular/core/testing';

import { UserDeleteStateService } from './user-delete-state.service';

describe('UserDeleteStateService', () => {
  let service: UserDeleteStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserDeleteStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
