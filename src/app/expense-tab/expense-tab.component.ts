import { Component, OnInit } from '@angular/core';
import {FormControl, Validators, FormGroup} from '@angular/forms';
import { ExpenseService } from '../services/expense.service'

@Component({
  selector: 'app-expense-tab',
  templateUrl: './expense-tab.component.html',
  styleUrls: ['./expense-tab.component.scss']
})
export class ExpenseTabComponent implements OnInit {

  constructor(public _ExpenseService: ExpenseService) { }
  // selectedDate = '';
  selectedDate = new Date();
  bulkData = [{addType: '', incomeDate: new Date()}];
  incomeData = [{addType: '', incomeDate: new Date()}];
  ngOnInit(): void {
    this._ExpenseService.selectedDate.subscribe(res=>{
      this.selectedDate = res
    })
    this._ExpenseService.bulkData.subscribe(res=>{
      this.bulkData = res;
    })
    this._ExpenseService.updateData();
    let value = new Date();
      let d = {
        selectedDate: value,
        selectedYear: value.getFullYear(),
        selectedMonth: value.getMonth(),
        selectedDay: value.getDate(),
      };
      this._ExpenseService.selectedDate.next(d);
    
  }
  

  expenseDateForm = new FormGroup({
    selectedExpenseDate: new FormControl('' , [Validators.required]),
  });
  showResult(){
    if(this.expenseDateForm.valid){
      this._ExpenseService.updateData();
      let value = this.expenseDateForm.controls['selectedExpenseDate'].value;
      let d = {
        selectedDate: value,
        selectedYear: value.getFullYear(),
        selectedMonth: value.getMonth(),
        selectedDay: value.getDate(),
      };
      this._ExpenseService.selectedDate.next(d);
    }
  }
}
