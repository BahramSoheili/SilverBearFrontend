import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComputerListCreateUpdateComponent } from './computer-list-create-update.component';

describe('ComputerListCreateUpdateComponent', () => {
  let component: ComputerListCreateUpdateComponent;
  let fixture: ComponentFixture<ComputerListCreateUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComputerListCreateUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComputerListCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
