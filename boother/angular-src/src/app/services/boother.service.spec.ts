import { TestBed, inject } from '@angular/core/testing';

import { BootherService } from './boother.service';

describe('BootherService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BootherService]
    });
  });

  it('should ...', inject([BootherService], (service: BootherService) => {
    expect(service).toBeTruthy();
  }));
});
