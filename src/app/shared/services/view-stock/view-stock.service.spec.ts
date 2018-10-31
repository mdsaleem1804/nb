import { TestBed, inject } from '@angular/core/testing';

import { ViewStockService } from './view-stock.service';

describe('ViewStockService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ViewStockService]
    });
  });

  it('should be created', inject([ViewStockService], (service: ViewStockService) => {
    expect(service).toBeTruthy();
  }));
});
