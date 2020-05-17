import { TestBed } from '@angular/core/testing';

import { LearningGuardService } from './learning-guard.service';

describe('LearningGuardService', () => {
  let service: LearningGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LearningGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
