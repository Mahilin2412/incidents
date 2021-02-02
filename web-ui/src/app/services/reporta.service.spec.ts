import { TestBed } from '@angular/core/testing';

import { ReportaService } from './reporta.service';

describe('ReportaService', () => {
  let service: ReportaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReportaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
