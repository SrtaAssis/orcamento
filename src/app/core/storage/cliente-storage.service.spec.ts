import { TestBed } from '@angular/core/testing';

import { ClienteStorageService } from './cliente-storage.service';

describe('ClienteStorageService', () => {
  let service: ClienteStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClienteStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
