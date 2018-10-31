import { TestBed, inject } from '@angular/core/testing';

import { SalesreportService } from './salesreport.service';

describe('SalesreportService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SalesreportService]
    });
  });

  it('should be created', inject([SalesreportService], (service: SalesreportService) => {
    expect(service).toBeTruthy();
  }));
});
