import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBookingsCheckinComponent } from './list-bookings-checkin.component';

describe('ListBookingsCheckinComponent', () => {
  let component: ListBookingsCheckinComponent;
  let fixture: ComponentFixture<ListBookingsCheckinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListBookingsCheckinComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListBookingsCheckinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
