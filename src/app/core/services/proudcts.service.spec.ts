import { TestBed } from '@angular/core/testing';

import { ProudctsService } from './proudcts.service';

describe('ProudctsService', () => {
  let service: ProudctsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProudctsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
