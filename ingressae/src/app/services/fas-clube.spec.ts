import { TestBed } from '@angular/core/testing';

import { FasClube } from './fas-clube';

describe('FasClube', () => {
  let service: FasClube;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FasClube);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
