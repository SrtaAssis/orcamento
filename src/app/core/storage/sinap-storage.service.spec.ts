import { TestBed } from '@angular/core/testing';

import { SinapStorageService } from './sinap-storage.service';

describe('SinapStorageService', () => {
  let service: SinapStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SinapStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
