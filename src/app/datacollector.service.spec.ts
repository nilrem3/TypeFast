import { TestBed } from '@angular/core/testing';

import { DatacollectorService } from './datacollector.service';

describe('DatacollectorService', () => {
  let service: DatacollectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatacollectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
