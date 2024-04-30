import { TestBed } from '@angular/core/testing';

import { PrecoRefStorageService } from './preco-ref-storage.service';

describe('PrecoRefStorageService', () => {
  let service: PrecoRefStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrecoRefStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
