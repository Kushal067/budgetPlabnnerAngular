import { TestBed } from '@angular/core/testing';

import { HttpTourService } from './http-tour.service';

describe('HttpTourService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HttpTourService = TestBed.get(HttpTourService);
    expect(service).toBeTruthy();
  });
});
