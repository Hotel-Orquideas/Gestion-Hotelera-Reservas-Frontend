import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidateBookingComponent } from './validate-booking.component';

describe('ValidateBookingComponent', () => {
  let component: ValidateBookingComponent;
  let fixture: ComponentFixture<ValidateBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidateBookingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValidateBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
