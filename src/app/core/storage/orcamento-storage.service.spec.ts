import { TestBed } from '@angular/core/testing';

import { OrcamentoStorageService } from './orcamento-storage.service';

describe('OrcamentoStorageService', () => {
  let service: OrcamentoStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrcamentoStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
