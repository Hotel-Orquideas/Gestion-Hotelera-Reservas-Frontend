import { TestBed } from '@angular/core/testing';

import { BookingRoomServiceService } from './booking-room-service.service';

describe('BookingRoomServiceService', () => {
  let service: BookingRoomServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookingRoomServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
