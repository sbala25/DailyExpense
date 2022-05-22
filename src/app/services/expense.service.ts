import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  constructor() { }
  bulkData = new BehaviorSubject<any>([]);
  selectedDate = new Subject<any>();
  addNewMoney(e:any){
    localStorage.setItem('dailyExpence', JSON.stringify(e));
  }

  getData(){
    return this.bulkData.asObservable();
  }
  getselectedDate(){
    return this.selectedDate.asObservable();
  }
  updateData(){
    let data =  JSON.parse(localStorage.getItem('dailyExpence')|| '[]');
    this.bulkData.next(data)
  }
}
