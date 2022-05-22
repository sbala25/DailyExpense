import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YearWiseExpenseComponent } from './year-wise-expense.component';

describe('YearWiseExpenseComponent', () => {
  let component: YearWiseExpenseComponent;
  let fixture: ComponentFixture<YearWiseExpenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YearWiseExpenseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YearWiseExpenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
