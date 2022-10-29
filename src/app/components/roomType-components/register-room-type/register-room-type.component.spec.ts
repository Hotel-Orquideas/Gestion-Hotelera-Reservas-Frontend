import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterRoomTypeComponent } from './register-room-type.component';

describe('RegisterRoomTypeComponent', () => {
  let component: RegisterRoomTypeComponent;
  let fixture: ComponentFixture<RegisterRoomTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterRoomTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterRoomTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
