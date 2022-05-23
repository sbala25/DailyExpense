import { Component, OnInit } from '@angular/core';
import { ExpenseService } from '../services/expense.service';

@Component({
  selector: 'app-year-wise-expense',
  templateUrl: './year-wise-expense.component.html',
  styleUrls: ['./year-wise-expense.component.scss']
})
export class YearWiseExpenseComponent implements OnInit {

  selectedDate ={validData: false, selectedYear: 0, selectedMonth: 0, selectedDay: 0 };
  bulkData = [{validData: false, addType: '', incomeDate: new Date(), incomeName: '', incomeAmount: 0, incomeYear: 0, incomeMonth: 0, incomeDay: 0, incomeType: 'emi', name: 'name'}];
  incomeData = this.bulkData;
  expenseData = this.bulkData;
  yearWiseTotalIncome = 0;
  yearWiseTotalExpense = 0;
  balance =0;
  monthData = [
    {key: 0, name: "January", totalAmount: 0},
    {key: 1, name: "February", totalAmount: 0},
    {key: 2, name: "March", totalAmount: 0},
    {key: 3, name: "April", totalAmount: 0},
    {key: 4, name: "May", totalAmount: 0},
    {key: 5, name: "June", totalAmount: 0},
    {key: 6, name: "July", totalAmount: 0},
    {key: 7, name: "August", totalAmount: 0},
    {key: 8, name: "September", totalAmount: 0},
    {key: 9, name: "October", totalAmount: 0},
    {key: 10, name: "November", totalAmount: 0},
    {key: 11, name: "December", totalAmount: 0}
  ]
  monthDataIncome:{key: number, name: string, totalAmount: number}[] = [];
  monthDataExpense:{key: number, name: string, totalAmount: number}[] = [];
  categoryData: { id: string; name: string; moneyAmount: number; chartscolor: string}[]=[
    {id: 'emi', name: 'EMI', chartscolor: 'rgb(255, 51, 51)', moneyAmount: 0 },
    {id: 'shopping', name: 'Shopping', chartscolor: 'rgb(0, 0, 102)', moneyAmount: 0},
    {id: 'Food', name: 'Food', chartscolor: 'rgb(102,0,102)', moneyAmount: 0},
    {id: 'ravelling', name: 'Travelling', chartscolor: 'rgb(255, 255, 0)', moneyAmount: 0},
    {id: 'homeExpense', name: 'homeExpense', chartscolor: 'rgb(255, 102, 102)', moneyAmount: 0},
    {id: 'others', name: 'Others', chartscolor: 'rgb(51, 255, 255)', moneyAmount: 0}
  ]
  chartsData = [{id: 'emi',name: 'EMI', moneyAmount: 0, chartscolor: 'rgb(255, 255, 255)'}];

  constructor(public _ExpenseService: ExpenseService) { }

  ngOnInit(): void {
    this.allIncome();
    this._ExpenseService.getselectedDate().subscribe(res=>{
      this.selectedDate = res;
      this.yearWiseIncome();
    })
  }

  yearWiseIncome(){
    this.monthDataIncome = [... this.monthData];
    this.monthDataExpense = [... this.monthData];
    this._ExpenseService.getData().subscribe(res2=>{
      this.bulkData = res2;
      this.incomeData = this.bulkData
                      .filter(el=>{ return el.addType == "income"})
                      .filter(el=> { return el.incomeYear == this.selectedDate.selectedYear })
      this.yearWiseTotalIncome = 0;
      this.incomeData.forEach(el=>{
        this.yearWiseTotalIncome = el.incomeAmount + this.yearWiseTotalIncome;
      })
      this.monthDataIncome.map(el=>{
        let total = 0;
        this.incomeData.forEach(el2=>{
          if(el2.incomeMonth == el.key){
            total = total+ el2.incomeAmount;
          }
        })
        el.totalAmount = total;
        return el;
      })
      this.yearWiseTotalExpense = 0;
      this.expenseData = this.bulkData
                      .filter(el2=>{ return el2.addType == "expense"})
                      .filter(el2=> { return el2.incomeYear == this.selectedDate.selectedYear })
      this.expenseData.forEach(el=>{
        this.yearWiseTotalExpense = el.incomeAmount + this.yearWiseTotalExpense;
      })
      // Category wise Expence  start
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
      this.monthDataExpense.map(el=>{
        let total = 0;
        this.expenseData.forEach(el2=>{
          if(el2.incomeMonth == el.key){
            total = total+ el2.incomeAmount;
          }
        })
        el.totalAmount = total
      })
      this.balance = this.yearWiseTotalIncome - this.yearWiseTotalExpense;
    });
  }

  allIncome(){
    this._ExpenseService.getData().subscribe(res2=>{
      this.bulkData = res2;
      this.incomeData = this.bulkData
                      .filter(el=>{ return el.addType == "income"})
      this.yearWiseTotalIncome = 0;
      this.incomeData.forEach(el=>{
        this.yearWiseTotalIncome = el.incomeAmount + this.yearWiseTotalIncome;
      })

      // welcome page data start
      this.monthDataIncome = [];
      let allIncomeD = [... this.incomeData];
      let allIncomeD2:any[] = [];
      allIncomeD.map(el=> {
        el.name = 'Year-'+ el.incomeYear;
        return el;
      })
      allIncomeD.forEach(el=>{
        allIncomeD2.push(el.name);
      })
      allIncomeD2 = [... new Set(allIncomeD2)]
      allIncomeD2.forEach(el=>{
        let totalNow = 0;
        allIncomeD.forEach(k=>{
            if(k.name == el){
              totalNow = totalNow + k.incomeAmount;
            }
          })
          let objNew = {
            name: el,
            totalAmount: totalNow,
            key: 1
          }
          this.monthDataIncome.push(objNew);
          
      })
      // welcome page data end
      
      this.yearWiseTotalExpense = 0;
      this.expenseData = this.bulkData
                      .filter(el2=>{ return el2.addType == "expense"})
      this.expenseData.forEach(el=>{
        this.yearWiseTotalExpense = el.incomeAmount + this.yearWiseTotalExpense;
      })
      // Category wise Expence  start
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


      // welcome page data start
      this.monthDataExpense = [];
      let allExpenseD = [... this.expenseData];
      let allExpenseD2:any[] = [];
      allExpenseD.map(el=> {
        el.name = 'Year-'+ el.incomeYear;
        return el;
      })
      allExpenseD.forEach(el=>{
        allExpenseD2.push(el.name);
      })
      allExpenseD2 = [... new Set(allExpenseD2)]
      allExpenseD2.forEach(el=>{
        let totalNow = 0;
        allExpenseD.forEach(k=>{
            if(k.name == el){
              totalNow = totalNow + k.incomeAmount;
            }
          })
          let objNew = {
            name: el,
            totalAmount: totalNow,
            key: 1
          }
          this.monthDataExpense.push(objNew);
      })
      // welcome page data end
      this.balance = this.yearWiseTotalIncome - this.yearWiseTotalExpense;
    });
  }

}
