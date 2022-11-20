import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterPromotionComponent } from './register-promotion.component';

describe('RegisterPromotionComponent', () => {
  let component: RegisterPromotionComponent;
  let fixture: ComponentFixture<RegisterPromotionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterPromotionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterPromotionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
