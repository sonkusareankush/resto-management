import { TestBed } from '@angular/core/testing';

import { CommenService } from './commen.service';

describe('CommenService', () => {
  let service: CommenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
