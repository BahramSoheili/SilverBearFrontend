import { TestBed } from '@angular/core/testing';

import { ComputerApiService } from './computer-api.service';

describe('ComputerApiService', () => {
  let service: ComputerApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComputerApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
