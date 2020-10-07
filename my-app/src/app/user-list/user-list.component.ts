import { Component, OnInit } from '@angular/core';
import { RestapiService} from '../restapi.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users
  displayedColumns: string[] = ['_id','username', 'name', 'lastname', 'permission', 'symbol'];
  // dataSource = ELEMENT_DATA;
  dataSource
  username
  dialogRef
  permission

  constructor(private restapi : RestapiService, public dialog: MatDialog) { }

  ngOnInit(): void {

    this.getUsers();
    this.permission = localStorage.getItem('permission')

  }

  getUsers(){

    this.restapi.getUser()
    .subscribe(
      (val:any) => {
          console.log("POST call successful value returned in body",val);
          this.dataSource = val
          // this.columns = val[0];
          // this.columnsTwo = val[0].columns
          // return val;
      },
      response => {
        console.log("POST call in error", response.token);
      },
      () => {
        console.log("The POST observable is now completed.");
    });

  }

}
