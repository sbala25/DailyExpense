import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseChartMonthComponent } from './expense-chart-month.component';

describe('ExpenseChartMonthComponent', () => {
  let component: ExpenseChartMonthComponent;
  let fixture: ComponentFixture<ExpenseChartMonthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpenseChartMonthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenseChartMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
