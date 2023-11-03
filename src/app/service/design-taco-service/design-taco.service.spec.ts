import { TestBed } from '@angular/core/testing';

import { DesignTacoService } from './design-taco.service';

describe('DesignTacoService', () => {
  let service: DesignTacoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DesignTacoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
