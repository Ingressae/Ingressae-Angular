import { TestBed } from '@angular/core/testing';

import { Ingresso } from './ingresso';

describe('Ingresso', () => {
  let service: Ingresso;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Ingresso);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
