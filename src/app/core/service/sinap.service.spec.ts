import { TestBed } from '@angular/core/testing';

import { SinapService } from './sinap.service';

describe('SinapService', () => {
  let service: SinapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SinapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
