import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseChartYearComponent } from './expense-chart-year.component';

describe('ExpenseChartYearComponent', () => {
  let component: ExpenseChartYearComponent;
  let fixture: ComponentFixture<ExpenseChartYearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpenseChartYearComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenseChartYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
