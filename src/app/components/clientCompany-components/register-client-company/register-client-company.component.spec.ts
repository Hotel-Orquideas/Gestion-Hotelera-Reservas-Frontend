import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterClientCompanyComponent } from './register-client-company.component';

describe('RegisterClientCompanyComponent', () => {
  let component: RegisterClientCompanyComponent;
  let fixture: ComponentFixture<RegisterClientCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterClientCompanyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterClientCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
