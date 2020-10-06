import { Component } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogOverviewExampleDialog } from './dashboard/dialog-overview-example-dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-app';
  bool = false;
  audio = new Audio("https://file-examples-com.github.io/uploads/2017/11/file_example_MP3_5MG.mp3");
  

  constructor(public dialog: MatDialog) { }

  openDialog(){

    
  }
  
  openMenu(){

    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '450px',
      // data: {name: this.name, animal: this.animal}
    });

  }

  
  play(){


    if(!this.bool){

      this.audio.play();
      this.bool = !this.bool;
      console.log("played");
    }else{
      this.audio.pause();
      this.bool = !this.bool;
      console.log("paused");
    }


  }

}
