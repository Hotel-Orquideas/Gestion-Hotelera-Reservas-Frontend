import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPaymentMethodsComponent } from './list-payment-methods.component';

describe('ListPaymentMethodsComponent', () => {
  let component: ListPaymentMethodsComponent;
  let fixture: ComponentFixture<ListPaymentMethodsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPaymentMethodsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListPaymentMethodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
