import { TestBed } from '@angular/core/testing';

import { DataserviceService } from '../dataservice/dataservice.service';

describe('DataserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({})); 

  it('should be created', () => {
    const service: DataserviceService = TestBed.get(DataserviceService);
    expect(service).toBeTruthy();
  });
});
