import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryWiseExpenseComponent } from './category-wise-expense.component';

describe('CategoryWiseExpenseComponent', () => {
  let component: CategoryWiseExpenseComponent;
  let fixture: ComponentFixture<CategoryWiseExpenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryWiseExpenseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryWiseExpenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
