import { TestBed } from '@angular/core/testing';

import { ClientCompanyService } from './client-company.service';

describe('ClientCompanyService', () => {
  let service: ClientCompanyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientCompanyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
