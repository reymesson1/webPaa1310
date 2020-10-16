import { Component, OnInit } from '@angular/core';
import { RestapiService } from '../restapi.service';
import { UserComponent } from '../user/user.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { EditVideoComponent } from '../edit-video/edit-video.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  displayedColumns: string[] = ['id', 'date', 'weight', 'symbol'];
  // dataSource = ELEMENT_DATA;
  dataSource
  username
  dialogRef
  permission

  constructor(private restapi : RestapiService, public dialog: MatDialog) { }

  ngOnInit(): void {

    this.username = localStorage.getItem('username')
    if(!this.restapi.isAuthenticated){
        this.openDialog();
    }    

    this.restapi.getMasterToken()
    .subscribe(
        (val:any) => {
            console.log("POST call successful value returned in body",val);
            // this.columns = val
            this.dataSource = val
        },
        response => {
          console.log("POST call in error", response.token);
        },
        () => {
          console.log("The POST observable is now completed.");
    });

    this.permission = localStorage.getItem("permission")



  }

  openDialog(): void {

    this.dialogRef = this.dialog.open(UserComponent, {
      width: '800px',
    });

    this.dialogRef.disableClose = true;
  }

  edit(_id){

    this.dialogRef = this.dialog.open(EditVideoComponent, {
      width: '800px',
      data: { _id: _id },
    });

    console.log(_id);
  }

  delete(_id){

    this.restapi.deleteVideo(_id)
    .subscribe(
        (val:any) => {
            console.log("POST call successful value returned in body",val);
            location.reload();
        },
        response => {
          console.log("POST call in error", response.token);

        },
        () => {
          console.log("The POST observable is now completed.");
    }); 


  }



}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];
