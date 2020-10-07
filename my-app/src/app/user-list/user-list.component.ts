import { Component, OnInit } from '@angular/core';
import { RestapiService} from '../restapi.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  name : string = 'New User';
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

  openDialog(): void {

    const dialogRef = this.dialog.open(RegisterComponent, {
      width: '450px',
      data: {name: this.name}
    });

    // dialogRef.disableClose = true;


    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed');
    //   this.animal = result;
    // });
  

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
