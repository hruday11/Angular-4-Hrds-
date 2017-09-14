import { TestBed, inject } from '@angular/core/testing';

import { DraftsService } from './drafts.service';

describe('DraftsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DraftsService]
    });
  });

  it('should be created', inject([DraftsService], (service: DraftsService) => {
    expect(service).toBeTruthy();
  }));
});
