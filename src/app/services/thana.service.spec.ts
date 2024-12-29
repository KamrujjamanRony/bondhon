import { TestBed } from '@angular/core/testing';

import { ThanaService } from './thana.service';

describe('ThanaService', () => {
  let service: ThanaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThanaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
