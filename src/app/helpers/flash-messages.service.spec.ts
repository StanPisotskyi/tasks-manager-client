import { TestBed } from '@angular/core/testing';

import { FlashMessagesService } from './flash-messages.service';

describe('FlashMessagesService', () => {
  let service: FlashMessagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlashMessagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
