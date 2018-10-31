import { TestBed, inject } from '@angular/core/testing';

import { SidebarcountService } from './sidebarcount.service';

describe('SidebarcountService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SidebarcountService]
    });
  });

  it('should be created', inject([SidebarcountService], (service: SidebarcountService) => {
    expect(service).toBeTruthy();
  }));
});
