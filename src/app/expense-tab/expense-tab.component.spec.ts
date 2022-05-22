import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseTabComponent } from './expense-tab.component';

describe('ExpenseTabComponent', () => {
  let component: ExpenseTabComponent;
  let fixture: ComponentFixture<ExpenseTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpenseTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenseTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
