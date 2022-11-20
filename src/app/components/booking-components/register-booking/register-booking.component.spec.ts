import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterBookingComponent } from './register-booking.component';

describe('RegisterBookingComponent', () => {
  let component: RegisterBookingComponent;
  let fixture: ComponentFixture<RegisterBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterBookingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
