import { Component, OnInit, Inject, Input, OnChanges, SimpleChanges  } from '@angular/core';
import { DOCUMENT } from '@angular/common'; 
import Chart from 'chart.js/auto';


@Component({
  selector: 'app-expense-chart-month',
  templateUrl: './expense-chart-month.component.html',
  styleUrls: ['./expense-chart-month.component.scss']
})
export class ExpenseChartMonthComponent implements OnInit , OnChanges{

  @Input() chartsData:any = [{id: 'saving',name: 'Saving', moneyAmount: 0, chartscolor: 'green'}];
  
  myChart:any = null;

  constructor(@Inject(DOCUMENT) document: Document) { }

  ngOnInit(): void {
    
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.expenseChartsView(this.chartsData)
    // setTimeout(() => {this.expenseChartsView(this.chartsData)}, 4000);
  }
  expenseChartsView(chartsData2:any){
    
    let dataLabels:any = []
    let backgroundColor:any = []
    let dataValue:any  = []
    this.chartsData.forEach((el: { name: any; chartscolor: any, moneyAmount: any })=>{
      dataLabels.push(el.name);
      backgroundColor.push(el.chartscolor);
      dataValue.push(el.moneyAmount);
    })
    const ctx = document.getElementById('ctxMonth') as HTMLCanvasElement;
    if(this.myChart != null){
      this.myChart.destroy();
    }

    this.myChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: dataLabels,
            datasets: [{
              label: 'Expense Charts',
              data: dataValue,
              backgroundColor: backgroundColor,
              hoverOffset: 4
            }]
          },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
  }

}
