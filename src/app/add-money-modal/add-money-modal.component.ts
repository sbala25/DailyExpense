import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormControl, Validators, FormGroup} from '@angular/forms';
import { ExpenseService } from '../services/expense.service';
import { v4 as uuidv4 } from 'uuid';
import {MatSnackBar} from '@angular/material/snack-bar';


export interface DialogData {}

@Component({
  selector: 'app-add-money-modal',
  templateUrl: './add-money-modal.component.html',
  styleUrls: ['./add-money-modal.component.scss']
})
export class AddMoneyModalComponent implements OnInit {
  addTypeName: string = '';
  resiveData:any = {};
  selectBoxShow:boolean = false;
  expenseCatagories: { id: string; name: string; moneyAmount: number; chartscolor: string}[]=[
    {id: 'emi', name: 'EMI', chartscolor: 'rgb(255, 51, 51)', moneyAmount: 0 },
    {id: 'shopping', name: 'Shopping', chartscolor: 'rgb(0, 0, 102)', moneyAmount: 0},
    {id: 'Food', name: 'Rent', chartscolor: 'red', moneyAmount: 0},
    {id: 'ravelling', name: 'Travelling', chartscolor: 'rgb(255, 255, 0)', moneyAmount: 0},
    {id: 'homeExpense', name: 'homeExpense', chartscolor: 'rgb(255, 102, 102)', moneyAmount: 0},
    {id: 'others', name: 'Others', chartscolor: 'rgb(51, 255, 255)', moneyAmount: 0}
  ]
  constructor(
    public dialogRef: MatDialogRef<AddMoneyModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public _ExpenseService: ExpenseService,
    private _snackBar: MatSnackBar
  ) {}
  ngOnInit(): void {
    this.resiveData = this.data;
    // this._ExpenseService.categories.subscribe(res=>{
    //   this.expenseCatagories = res;
    // })
    if(this.resiveData.addType === 'income'){
      this.addTypeName = 'Income';
    }
    else if(this.resiveData.addType === 'expense'){
      this.addTypeName = 'Expense';
      this.selectBoxShow = true;
    }
  }

  addIncomeForm = new FormGroup({
    incomeName: new FormControl('', [Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
    incomeAmount: new FormControl('', [Validators.required]),
    incomeDate: new FormControl('', [Validators.required]),
    incomeType: new FormControl('emi', [Validators.required])
  });
  AddMoney(){
    if(this.addIncomeForm.valid){
      if(this.resiveData.addType === 'income'){
        let inputData = {
          incomeId: uuidv4(),
          incomeName : this.addIncomeForm.controls['incomeName'].value,
          incomeAmount : this.addIncomeForm.controls['incomeAmount'].value,
          incomeDate : this.addIncomeForm.controls['incomeDate'].value,
          incomeType : this.addIncomeForm.controls['incomeType'].value,
          addType : 'income',
          incomeYear: this.addIncomeForm.controls['incomeDate'].value.getFullYear(),
          incomeMonth: this.addIncomeForm.controls['incomeDate'].value.getMonth(),
          incomeDay: this.addIncomeForm.controls['incomeDate'].value.getDate()

        }
        this.sendAndUpdateData(inputData);
        this._snackBar.open('Money Added Successfully', 'Dismiss', {duration: 2000});
        this.closeModal();
      }
      else if(this.resiveData.addType === 'expense'){
        let inputData = {
          incomeId: uuidv4(),
          incomeName : this.addIncomeForm.controls['incomeName'].value,
          incomeAmount : this.addIncomeForm.controls['incomeAmount'].value,
          incomeDate : this.addIncomeForm.controls['incomeDate'].value,
          incomeType : this.addIncomeForm.controls['incomeType'].value,
          addType : 'expense',
          incomeYear: this.addIncomeForm.controls['incomeDate'].value.getFullYear(),
          incomeMonth: this.addIncomeForm.controls['incomeDate'].value.getMonth(),
          incomeDay: this.addIncomeForm.controls['incomeDate'].value.getDate()

        }
        this.sendAndUpdateData(inputData);
        this._snackBar.open('Money Added Successfully', 'Dismiss', {duration: 2000});
        this.closeModal();
      }
    }
  }
  sendAndUpdateData(inputData:any){
    let arr:any;
        this._ExpenseService.getData().subscribe((res)=>{
          arr = res;
        })
        arr.push(inputData);
        this._ExpenseService.addNewMoney(arr);
        this._ExpenseService.updateData();
  }
  closeModal(): void {
    this.dialogRef.close();
  }
}
