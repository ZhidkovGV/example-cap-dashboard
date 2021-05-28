import { TestBed } from '@angular/core/testing';

import { SharesDataService } from './shares-data.service';

describe('SharesDataService', () => {
  let service: SharesDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharesDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
