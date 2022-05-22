import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthWiseExpenseComponent } from './month-wise-expense.component';

describe('MonthWiseExpenseComponent', () => {
  let component: MonthWiseExpenseComponent;
  let fixture: ComponentFixture<MonthWiseExpenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonthWiseExpenseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthWiseExpenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
