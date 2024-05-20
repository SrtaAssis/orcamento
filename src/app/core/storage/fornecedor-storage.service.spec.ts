import { TestBed } from '@angular/core/testing';

import { FornecedorStorageService } from './fornecedor-storage.service';

describe('FornecedorStorageService', () => {
  let service: FornecedorStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FornecedorStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
