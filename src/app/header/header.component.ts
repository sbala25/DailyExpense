import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AddMoneyModalComponent } from '../add-money-modal/add-money-modal.component';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDialog(addType:string): void {
    const dialogRef = this.dialog.open(AddMoneyModalComponent, {
      width: '500px',
      data: {addType: addType},
    });
  }

}
