import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterPaymentMethodComponent } from './register-payment-method.component';

describe('RegisterPaymentMethodComponent', () => {
  let component: RegisterPaymentMethodComponent;
  let fixture: ComponentFixture<RegisterPaymentMethodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterPaymentMethodComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterPaymentMethodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
