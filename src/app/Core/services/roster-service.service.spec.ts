import { TestBed } from '@angular/core/testing';

import { RosterServiceService } from './roster-service.service';

describe('RosterServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RosterServiceService = TestBed.get(RosterServiceService);
    expect(service).toBeTruthy();
  });
});
