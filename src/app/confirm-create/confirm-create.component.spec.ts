import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmCreateComponent } from './confirm-create.component';

describe('ConfirmCreateComponent', () => {
  let component: ConfirmCreateComponent;
  let fixture: ComponentFixture<ConfirmCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
