import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBillsDetailsComponent } from './list-bills-details.component';

describe('ListBillsDetailsComponent', () => {
  let component: ListBillsDetailsComponent;
  let fixture: ComponentFixture<ListBillsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListBillsDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListBillsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
