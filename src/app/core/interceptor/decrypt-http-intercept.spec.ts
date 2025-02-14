import { TestBed } from '@angular/core/testing';

import { DecryptHttpIntercept } from './decrypt-http-intercept';

describe('HttpInterceptService', () => {
  let service: DecryptHttpIntercept;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DecryptHttpIntercept);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
