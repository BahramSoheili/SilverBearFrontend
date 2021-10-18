import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDeletingComponent } from './confirm-deleting.component';

describe('ConfirmDeletingComponent', () => {
  let component: ConfirmDeletingComponent;
  let fixture: ComponentFixture<ConfirmDeletingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmDeletingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmDeletingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
