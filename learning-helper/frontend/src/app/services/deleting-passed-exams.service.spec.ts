import { TestBed } from '@angular/core/testing';

import { DeletingPassedExamsService } from './deleting-passed-exams.service';

describe('DeletingPassedExamsService', () => {
  let service: DeletingPassedExamsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeletingPassedExamsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
