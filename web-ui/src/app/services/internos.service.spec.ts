import { TestBed } from '@angular/core/testing';

import { InternosService } from './internos.service';

describe('InternosService', () => {
  let service: InternosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InternosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
