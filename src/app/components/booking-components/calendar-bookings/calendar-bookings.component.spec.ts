import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarBookingsComponent } from './calendar-bookings.component';

describe('CalendarBookingsComponent', () => {
  let component: CalendarBookingsComponent;
  let fixture: ComponentFixture<CalendarBookingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarBookingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendarBookingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
