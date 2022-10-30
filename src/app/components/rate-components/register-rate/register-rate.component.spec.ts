import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterRateComponent } from './register-rate.component';

describe('RegisterRateComponent', () => {
  let component: RegisterRateComponent;
  let fixture: ComponentFixture<RegisterRateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterRateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
