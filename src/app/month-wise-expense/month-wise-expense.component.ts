import { Component, OnInit } from '@angular/core';
import { ExpenseService } from '../services/expense.service';

@Component({
  selector: 'app-month-wise-expense',
  templateUrl: './month-wise-expense.component.html',
  styleUrls: ['./month-wise-expense.component.scss']
})
export class MonthWiseExpenseComponent implements OnInit {
  selectedDate ={validData: false, selectedYear: 0, selectedMonth: 0, selectedDay: 0 };
  bulkData = [{validData: false, addType: '', incomeDate: new Date(), incomeName: '', incomeAmount: 0, incomeYear: 0, incomeMonth: 0, incomeDay: 0, incomeType: 'emi'}];
  incomeData = this.bulkData;
  expenseData = this.bulkData;
  monthWiseTotalIncome = 0;
  monthWiseTotalExpense = 0;
  balance =0;
  lastDateOfmonth :any;
  dayDataIncome = [{name: '', totalAmount: 0}];
  dayDataExpense = [{name: '', totalAmount: 0}];
  categoryDataMonth: { id: string; name: string; moneyAmount: number; chartscolor: string}[]=[
    {id: 'emi', name: 'EMI', chartscolor: 'rgb(255, 51, 51)', moneyAmount: 0 },
    {id: 'shopping', name: 'Shopping', chartscolor: 'rgb(0, 0, 102)', moneyAmount: 0},
    {id: 'Food', name: 'Rent', chartscolor: 'red', moneyAmount: 0},
    {id: 'ravelling', name: 'Travelling', chartscolor: 'rgb(255, 255, 0)', moneyAmount: 0},
    {id: 'homeExpense', name: 'homeExpense', chartscolor: 'rgb(255, 102, 102)', moneyAmount: 0},
    {id: 'others', name: 'Others', chartscolor: 'rgb(51, 255, 255)', moneyAmount: 0}
  ]
  chartsData = [{id: 'emi',name: 'EMI', moneyAmount: 0, chartscolor: 'rgb(255, 255, 255)'}];

  constructor(public _ExpenseService: ExpenseService) { }

  ngOnInit(): void {
    this._ExpenseService.getselectedDate().subscribe(res=>{
      this.selectedDate = res;
      this.monthWiseIncome()
    })
    this.monthWiseIncome();
  }

  monthWiseIncome(){
    
    this._ExpenseService.getData().subscribe(res2=>{
      this.bulkData = res2;
      this.incomeData = this.bulkData
                      .filter(el=>{ return el.addType == "income"})
                      .filter(el=> { return el.incomeYear == this.selectedDate.selectedYear })
                      .filter(el=> {return el.incomeMonth  == this.selectedDate.selectedMonth})
      this.monthWiseTotalIncome = 0;
      this.incomeData.forEach(el=>{
        this.monthWiseTotalIncome = el.incomeAmount + this.monthWiseTotalIncome;
      })
      this.lastDateOfmonth = new Date(this.selectedDate.selectedYear, this.selectedDate.selectedMonth + 1, 0).getDate();
      this.dayDataIncome =[];
      for(let i = 0; i < this.lastDateOfmonth; i++){
        let total = 0;
        this.incomeData.forEach(el=>{
          if(el.incomeDay == i+1 )
          total = total + el.incomeAmount;
        })
        let obj = {
          name : i+'-'+ this.getMonthName(this.selectedDate.selectedMonth)+'-'+this.selectedDate.selectedYear,
          totalAmount: total
        }
        this.dayDataIncome.push(obj);
      }
      this.dayDataIncome = this.dayDataIncome.filter(el=> {
        return el.totalAmount> 0
      })

      this.monthWiseTotalExpense = 0;
      this.expenseData = this.bulkData
                      .filter(el2=>{ return el2.addType == "expense"})
                      .filter(el2=> { return el2.incomeYear == this.selectedDate.selectedYear })
                      .filter(el=> {return el.incomeMonth  == this.selectedDate.selectedMonth})
      this.expenseData.forEach(el=>{
        this.monthWiseTotalExpense = el.incomeAmount + this.monthWiseTotalExpense;
      })
      // Category wise Expence  start

      let categoryData3: { id: string; name: string; moneyAmount: number; chartscolor: string}[] = [];
      this.categoryDataMonth.forEach((el)=>{
        let total = 0;
        this.expenseData.forEach(el2=>{
          if(el2.incomeType == el.id){
            total = total + el2.incomeAmount;
          }
        })
        el.moneyAmount = total;
        categoryData3.push(el);
      })
      this.categoryDataMonth = categoryData3;
      // Category wise Expence  end

      this.balance = this.monthWiseTotalIncome - this.monthWiseTotalExpense;
      this.dayDataExpense =[];
      for(let i = 0; i < this.lastDateOfmonth; i++){
        let total = 0;
        this.expenseData.forEach(el=>{
          if(el.incomeDay == i+1 )
          total = total + el.incomeAmount;
        })
        let obj = {
          name : i+'-'+ this.getMonthName(this.selectedDate.selectedMonth)+'-'+this.selectedDate.selectedYear,
          totalAmount: total
        }
        this.dayDataExpense.push(obj);
      }
      this.dayDataExpense = this.dayDataExpense.filter(el=> {
        return el.totalAmount> 0
      })
    });
  }
  getMonthName(e:any){
    const month = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    return month[e]
  }

}
