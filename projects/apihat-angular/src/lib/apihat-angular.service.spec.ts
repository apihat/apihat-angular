import { TestBed } from '@angular/core/testing';

import { ApihatAngularService } from './apihat-angular.service';

describe('ApihatAngularService', () => {
  let service: ApihatAngularService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApihatAngularService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
