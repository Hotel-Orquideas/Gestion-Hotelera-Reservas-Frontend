import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPaymentsHistoryComponent } from './list-payments-history.component';

describe('ListPaymentsHistoryComponent', () => {
  let component: ListPaymentsHistoryComponent;
  let fixture: ComponentFixture<ListPaymentsHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPaymentsHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListPaymentsHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
