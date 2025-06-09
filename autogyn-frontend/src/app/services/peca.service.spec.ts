import { TestBed } from '@angular/core/testing';

import { Peca } from './peca';

describe('Peca', () => {
  let service: Peca;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Peca);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
