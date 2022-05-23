import { Component, OnInit } from '@angular/core';
import { ExpenseService } from '../services/expense.service';

@Component({
  selector: 'app-month-wise-expense',
  templateUrl: './month-wise-expense.component.html',
  styleUrls: ['./month-wise-expense.component.scss']
})
export class MonthWiseExpenseComponent implements OnInit {
  selectedDate ={validData: false, selectedYear: 0, selectedMonth: 0, selectedDay: 0 };
  bulkData = [{validData: false, addType: '', incomeDate: new Date(), incomeName: '', incomeAmount: 0, incomeYear: 0, incomeMonth: 0, incomeDay: 0, incomeType: 'emi', name: 'aa'}];
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
    {id: 'Food', name: 'Rent', chartscolor: 'rgb(102,0,102)', moneyAmount: 0},
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
      this.monthWiseIncome()
    })
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
          name : (i+1)+'-'+ this.getMonthName(this.selectedDate.selectedMonth)+'-'+this.selectedDate.selectedYear,
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
          name : (i+1)+'-'+ this.getMonthName(this.selectedDate.selectedMonth)+'-'+this.selectedDate.selectedYear,
          totalAmount: total
        }
        this.dayDataExpense.push(obj);
      }
      this.dayDataExpense = this.dayDataExpense.filter(el=> {
        return el.totalAmount> 0
      })
    });
  }

  allIncome(){  
    this._ExpenseService.getData().subscribe(res2=>{
      this.bulkData = res2;
      this.incomeData = this.bulkData
                      .filter(el=>{ return el.addType == "income"})
      this.monthWiseTotalIncome = 0;
      this.incomeData.forEach(el=>{
        this.monthWiseTotalIncome = el.incomeAmount + this.monthWiseTotalIncome;
      })
      // welcome page data start
      let allInconeD = [...this.incomeData];
      let allIncome2:any[]=[];

      
      allInconeD.map(el=>{
        el.name = this.getMonthName(el.incomeMonth)+'-'+el.incomeYear;
        return el;
      })
      allInconeD.forEach(el=>{
        allIncome2.push(el.name);
      })
      allIncome2 = [... new Set(allIncome2)]
      this.dayDataIncome =[];
      allIncome2.forEach(el=>{
        let totalNow = 0;
        allInconeD.forEach(k=>{
            if(k.name == el){
              totalNow = totalNow + k.incomeAmount;
            }
          })
          let obj = {
            name: el,
            totalAmount: totalNow
          }
          this.dayDataIncome.push(obj)
      })

      // welcome page data start

      this.monthWiseTotalExpense = 0;
      this.expenseData = this.bulkData
                      .filter(el2=>{ return el2.addType == "expense"})
      this.expenseData.forEach(el=>{
        this.monthWiseTotalExpense = el.incomeAmount + this.monthWiseTotalExpense;
      })
      // welcome page data start
      let allExpenseD = [...this.expenseData];
      let allExpenseD2:any[]=[];


      allExpenseD.map(el=>{
        el.name = this.getMonthName(el.incomeMonth)+'-'+el.incomeYear;
        return el;
      })
      allExpenseD.forEach(el=>{
        allExpenseD2.push(el.name);
      })
      allExpenseD2 = [... new Set(allExpenseD2)]
      this.dayDataExpense =[];
      allExpenseD2.forEach(el=>{
        let totalNow = 0;
        allExpenseD.forEach(k=>{
            if(k.name == el){
              totalNow = totalNow + k.incomeAmount;
            }
          })
          let obj = {
            name: el,
            totalAmount: totalNow
          }
          this.dayDataExpense.push(obj)
      })

      // welcome page data start

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
      
    });
  }

  getMonthName(e:any){
    const month = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    return month[e]
  }

}
