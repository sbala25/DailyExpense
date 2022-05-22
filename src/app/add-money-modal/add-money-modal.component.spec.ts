import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMoneyModalComponent } from './add-money-modal.component';

describe('AddMoneyModalComponent', () => {
  let component: AddMoneyModalComponent;
  let fixture: ComponentFixture<AddMoneyModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMoneyModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMoneyModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
