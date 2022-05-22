import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayWiseExpenseComponent } from './day-wise-expense.component';

describe('DayWiseExpenseComponent', () => {
  let component: DayWiseExpenseComponent;
  let fixture: ComponentFixture<DayWiseExpenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DayWiseExpenseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DayWiseExpenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
