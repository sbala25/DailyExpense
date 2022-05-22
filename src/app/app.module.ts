import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatNativeDateModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSelectModule} from '@angular/material/select';
import {MatTabsModule} from '@angular/material/tabs';
import {MatIconModule} from '@angular/material/icon';
import {MatSnackBarModule} from '@angular/material/snack-bar';

import { ExpenseTabComponent } from './expense-tab/expense-tab.component';
import { DayWiseExpenseComponent } from './day-wise-expense/day-wise-expense.component';
import { AddMoneyModalComponent } from './add-money-modal/add-money-modal.component';
import { ExpenseChartComponent } from './expense-chart/expense-chart.component';
import { YearWiseExpenseComponent } from './year-wise-expense/year-wise-expense.component';
import { MonthWiseExpenseComponent } from './month-wise-expense/month-wise-expense.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ExpenseTabComponent,
    DayWiseExpenseComponent,
    AddMoneyModalComponent,
    ExpenseChartComponent,
    YearWiseExpenseComponent,
    MonthWiseExpenseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatSelectModule,
    MatTabsModule,
    MatIconModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
