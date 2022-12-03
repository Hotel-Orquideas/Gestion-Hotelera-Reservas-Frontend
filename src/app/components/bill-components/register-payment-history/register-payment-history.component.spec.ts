import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterPaymentHistoryComponent } from './register-payment-history.component';

describe('RegisterPaymentHistoryComponent', () => {
  let component: RegisterPaymentHistoryComponent;
  let fixture: ComponentFixture<RegisterPaymentHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterPaymentHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterPaymentHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
