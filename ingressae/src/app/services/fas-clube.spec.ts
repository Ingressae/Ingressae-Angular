import { TestBed } from '@angular/core/testing';

import { FasClubeService } from './fas-clube';

describe('FasClubeService', () => {
  let service: FasClubeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FasClubeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
