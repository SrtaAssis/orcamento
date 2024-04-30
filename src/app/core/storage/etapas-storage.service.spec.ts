import { TestBed } from '@angular/core/testing';

import { EtapasStorageService } from './etapas-storage.service';

describe('EtapasStorageService', () => {
  let service: EtapasStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EtapasStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
