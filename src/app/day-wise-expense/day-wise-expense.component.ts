import { Component, Inject, OnInit } from '@angular/core';
import { ExpenseService } from '../services/expense.service';
import {MatSnackBar} from '@angular/material/snack-bar';



@Component({
  selector: 'app-day-wise-expense',
  templateUrl: './day-wise-expense.component.html',
  styleUrls: ['./day-wise-expense.component.scss']
})
export class DayWiseExpenseComponent implements OnInit {

  selectedDate ={validData: false, selectedYear: 0, selectedMonth: 0, selectedDay: 0 };
  bulkData = [{validData: false, addType: '', incomeDate: new Date(), incomeName: '', incomeAmount: 0, incomeYear: 0, incomeMonth: 0, incomeDay: 0, incomeType: 'emi', incomeId: 0, tooltip: 'tooltip'}];
  incomeData = this.bulkData;
  expenseData = this.bulkData;
  dayWiseTotalIncome = 0;
  dayWiseTotalExpense = 0;
  balance =0;
  categoryData: { id: string; name: string; moneyAmount: number; chartscolor: string}[]=[
    {id: 'emi', name: 'EMI', chartscolor: 'rgb(255, 51, 51)', moneyAmount: 0 },
    {id: 'shopping', name: 'Shopping', chartscolor: 'rgb(0, 0, 102)', moneyAmount: 0},
    {id: 'Food', name: 'Food', chartscolor: 'rgb(102,0,102)', moneyAmount: 0},
    {id: 'ravelling', name: 'Travelling', chartscolor: 'rgb(255, 255, 0)', moneyAmount: 0},
    {id: 'homeExpense', name: 'homeExpense', chartscolor: 'rgb(255, 102, 102)', moneyAmount: 0},
    {id: 'others', name: 'Others', chartscolor: 'rgb(51, 255, 255)', moneyAmount: 100}
  ]
  chartsData = [{id: 'emi',name: 'EMI', moneyAmount: 0, chartscolor: 'rgb(255, 255, 255)'}];
  constructor(public _ExpenseService: ExpenseService, private _snackBar: MatSnackBar) { 
  }
  
  ngOnInit(): void {
    this.allIncome();
    this._ExpenseService.getselectedDate().subscribe(res=>{
      this.selectedDate = res;
      this.daywiseIncome();
    })
    
    
  }

  daywiseIncome(){
    this._ExpenseService.getData().subscribe(res2=>{
      let bulkDataUnsort = [...res2];
      bulkDataUnsort.sort(function(a,b) {
        return a.incomeDateMilliseconds - b.incomeDateMilliseconds;
    });
    bulkDataUnsort = bulkDataUnsort.reverse();
      this.bulkData = [...bulkDataUnsort];

      this.incomeData = this.bulkData
                      .filter(el=>{ return el.addType == "income"})
                      .filter(el=> { return el.incomeYear == this.selectedDate.selectedYear })
                      .filter(el=> {return el.incomeMonth  == this.selectedDate.selectedMonth})
                      .filter(el=> {return el.incomeDay == this.selectedDate.selectedDay})
      this.dayWiseTotalIncome = 0;
      this.incomeData.forEach(el=>{
        this.dayWiseTotalIncome = el.incomeAmount + this.dayWiseTotalIncome;
      })
      this.dayWiseTotalExpense = 0;
      this.expenseData = this.bulkData
                      .filter(el2=>{ return el2.addType == "expense"})
                      .filter(el2=> { return el2.incomeYear == this.selectedDate.selectedYear })
                      .filter(el2=> {return el2.incomeMonth  == this.selectedDate.selectedMonth})
                      .filter(el2=> {return el2.incomeDay == this.selectedDate.selectedDay})
      this.expenseData.forEach(el=>{
        this.dayWiseTotalExpense = el.incomeAmount + this.dayWiseTotalExpense;
      })
      // Category wise Expence start
      let categoryData2: { id: string; name: string; moneyAmount: number; chartscolor: string}[] = [];
      this.categoryData.forEach(el=>{
        let total = 0;
        this.expenseData.forEach(el2=>{
          if(el2.incomeType == el.id){
            total = total + el2.incomeAmount;
          }
        })
        el.moneyAmount = total;
        categoryData2.push(el);
      })
      this.categoryData = categoryData2;
      // Category wise Expence end

      this.balance = this.dayWiseTotalIncome - this.dayWiseTotalExpense;
      // Category wise Expence and Saving Charts start
      this.chartsData = [... categoryData2];
      let savingObj = {id: 'saving',name: 'Saving', moneyAmount: this.balance, chartscolor: 'rgb(0, 153, 0)'}
      if(this.balance<0){
        savingObj.moneyAmount = 0;
      }
      this.chartsData.push(savingObj);
      // Category wise Expence and Saving Charts end
    });
    
  }

  allIncome(){
    this._ExpenseService.getData().subscribe(res2=>{
      let bulkDataUnsort = [...res2];
      bulkDataUnsort.sort(function(a,b) {
        return a.incomeDateMilliseconds - b.incomeDateMilliseconds;
    });
    bulkDataUnsort = bulkDataUnsort.reverse();
      this.bulkData = [...bulkDataUnsort];
    this.bulkData.map(el=>{
      el.tooltip = el.incomeDay+'/'+(el.incomeMonth+1)+'/'+el.incomeYear;
    })
      this.incomeData = this.bulkData
                      .filter(el=>{ return el.addType == "income"})
      this.dayWiseTotalIncome = 0;
      this.incomeData.forEach(el=>{
        this.dayWiseTotalIncome = el.incomeAmount + this.dayWiseTotalIncome;
      })
      this.dayWiseTotalExpense = 0;
      this.expenseData = this.bulkData
                      .filter(el2=>{ return el2.addType == "expense"})
      this.expenseData.forEach(el=>{
        this.dayWiseTotalExpense = el.incomeAmount + this.dayWiseTotalExpense;
      })
      // Category wise Expence start
      let categoryData2: { id: string; name: string; moneyAmount: number; chartscolor: string}[] = [];
      this.categoryData.forEach(el=>{
        let total = 0;
        this.expenseData.forEach(el2=>{
          if(el2.incomeType == el.id){
            total = total + el2.incomeAmount;
          }
        })
        el.moneyAmount = total;
        categoryData2.push(el);
      })
      this.categoryData = [...categoryData2];
      // Category wise Expence end

      this.balance = this.dayWiseTotalIncome - this.dayWiseTotalExpense;
      // Category wise Expence and Saving Charts start
      this.chartsData = [... categoryData2];
      let savingObj = {id: 'saving',name: 'Saving', moneyAmount: this.balance, chartscolor: 'rgb(0, 153, 0)'}
      if(this.balance<0){
        savingObj.moneyAmount = 0;
      }
      this.chartsData.push(savingObj);
      // Category wise Expence and Saving Charts end
    
    });
  }

  deleteMoney(e:any){
    let newData = [...this.bulkData]
    newData = newData.filter(el=> el.incomeId != e);
    this._ExpenseService.addNewMoney(newData);
    this._ExpenseService.updateData();
    this._snackBar.open('Money Deteted Successfully', 'Dismiss', {duration: 2000});
  }
  

}
