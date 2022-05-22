import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-category-wise-expense',
  templateUrl: './category-wise-expense.component.html',
  styleUrls: ['./category-wise-expense.component.scss']
})
export class CategoryWiseExpenseComponent implements OnInit, OnChanges {

  @Input() categoryData:any;

  constructor() { }

  ngOnInit(): void {
  }
  ngOnChanges(changes: SimpleChanges): void {
  }

}
