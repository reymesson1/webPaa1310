import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { RestapiService} from '../restapi.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { RegisterComponent } from '../register/register.component';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements AfterViewInit {

  editMode : boolean = false;
  name : string = 'New User';
  displayedColumns: string[] = ['_id','username', 'name', 'lastname', 'permission', 'symbol'];
  // dataSource = ELEMENT_DATA;
  dataSource
  username
  dialogRef
  permission
  @ViewChild(MatSort) sort: MatSort;


  constructor(private restapi : RestapiService, public dialog: MatDialog) { }

  ngOnInit(): void {

    this.getUsers();
    this.permission = localStorage.getItem('permission')

  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
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

  edit(id){

    console.log('edit')
    console.log(id)

    for(var x=0;x<this.dataSource.length;x++){

      if(this.dataSource[x]._id==id){
        console.log(this.dataSource[x]);
        this.restapi.userEditArr = this.dataSource[x];
      }

    }

    this.restapi.userEditMode = true;

    this.openDialog();
  }

  delete(_id){

    this.restapi.deleteUser(_id)
    .subscribe(
      (val:any) => {
            console.log("POST call successful value returned in body",val);
            setTimeout(() => {
              
              location.reload();
            }, 1000);

        },
        response => {
          console.log("POST call in error", response.token);

        },
        () => {
          console.log("The POST observable is now completed.");
    }); 


  }

  getUsers(){

    this.restapi.getUser()
    .subscribe(
      (val:any) => {
          console.log("POST call successful value returned in body",val);
          this.dataSource = new MatTableDataSource<any>(val)
          this.dataSource.sort = this.sort
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
