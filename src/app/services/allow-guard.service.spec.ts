import { TestBed } from '@angular/core/testing';

import { AllowGuardService } from './allow-guard.service';

describe('AllowGuardService', () => {
  let service: AllowGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllowGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
