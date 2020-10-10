import { Component, OnInit } from '@angular/core';
import { RestapiService } from '../restapi.service'; 
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-view-score',
  templateUrl: './view-score.component.html',
  styleUrls: ['./view-score.component.css']
})
export class ViewScoreComponent implements OnInit {

  message : String = ""

  filename : String = ""

  constructor(public restapi : RestapiService, public dialog: MatDialog) { }

  ngOnInit(): void {

    this.message = this.restapi.messageModal 
    this.filename = this.restapi.filename
  }

  viewModal(){

    if(this.restapi.messageModal=="Video 1"){
      
      this.restapi.dialogRefVideo.close();
    }else if(this.restapi.messageModal=="Video 2"){

      this.restapi.dialogRefVideo2.close();
    }else if(this.restapi.messageModal=="Video 3"){

      this.restapi.dialogRefVideo3.close();
    }else if(this.restapi.messageModal=="Video 4"){

      this.restapi.dialogRefVideo4.close();
    }else if(this.restapi.messageModal=="Video 5"){

      this.restapi.dialogRefVideo5.close();
    }else if(this.restapi.messageModal=="Video 7"){

      this.restapi.dialogRefVideo7.close();
    }

    this.restapi.messageModal = "Video 1"

    this.restapi.dialogRefVideo = this.dialog.open(ViewScoreComponent, {
      width: '550px',height: '400px',
      // data: {name: this.name, animal: this.animal,'test':'test'}
    });


  }

  viewModal2(){

    if(this.restapi.messageModal=="Video 1"){
      
      this.restapi.dialogRefVideo.close();
    }else if(this.restapi.messageModal=="Video 2"){

      this.restapi.dialogRefVideo2.close();
    }else if(this.restapi.messageModal=="Video 3"){

      this.restapi.dialogRefVideo3.close();
    }else if(this.restapi.messageModal=="Video 4"){

      this.restapi.dialogRefVideo4.close();
    }else if(this.restapi.messageModal=="Video 5"){

      this.restapi.dialogRefVideo5.close();
    }else if(this.restapi.messageModal=="Video 7"){

      this.restapi.dialogRefVideo7.close();
    }

    this.restapi.messageModal = "Video 2"

    this.restapi.dialogRefVideo2 = this.dialog.open(ViewScoreComponent, {
      width: '550px',height: '400px',
      // data: {name: this.name, animal: this.animal,'test':'test'}
    });

       

  }

  viewModal3(){

    if(this.restapi.messageModal=="Video 1"){
      
      this.restapi.dialogRefVideo.close();
    }else if(this.restapi.messageModal=="Video 2"){

      this.restapi.dialogRefVideo2.close();
    }else if(this.restapi.messageModal=="Video 3"){

      this.restapi.dialogRefVideo3.close();
    }else if(this.restapi.messageModal=="Video 4"){

      this.restapi.dialogRefVideo4.close();
    }else if(this.restapi.messageModal=="Video 5"){

      this.restapi.dialogRefVideo5.close();
    }else if(this.restapi.messageModal=="Video 7"){

      this.restapi.dialogRefVideo7.close();
    }

    this.restapi.messageModal = "Video 3"

    this.restapi.dialogRefVideo3 = this.dialog.open(ViewScoreComponent, {
      width: '550px',height: '400px',
      // data: {name: this.name, animal: this.animal,'test':'test'}
    });

       

  }

  viewModal4(){

    if(this.restapi.messageModal=="Video 1"){
      
      this.restapi.dialogRefVideo.close();
    }else if(this.restapi.messageModal=="Video 2"){

      this.restapi.dialogRefVideo2.close();
    }else if(this.restapi.messageModal=="Video 3"){

      this.restapi.dialogRefVideo3.close();
    }else if(this.restapi.messageModal=="Video 4"){

      this.restapi.dialogRefVideo4.close();
    }else if(this.restapi.messageModal=="Video 5"){

      this.restapi.dialogRefVideo5.close();
    }else if(this.restapi.messageModal=="Video 7"){

      this.restapi.dialogRefVideo7.close();
    }

    this.restapi.messageModal = "Video 4"

    this.restapi.dialogRefVideo4 = this.dialog.open(ViewScoreComponent, {
      width: '550px',height: '400px',
      // data: {name: this.name, animal: this.animal,'test':'test'}
    });

       

  }

  viewModal5(){

    if(this.restapi.messageModal=="Video 1"){
      
      this.restapi.dialogRefVideo.close();
    }else if(this.restapi.messageModal=="Video 2"){

      this.restapi.dialogRefVideo2.close();
    }else if(this.restapi.messageModal=="Video 3"){

      this.restapi.dialogRefVideo3.close();
    }else if(this.restapi.messageModal=="Video 4"){

      this.restapi.dialogRefVideo4.close();
    }else if(this.restapi.messageModal=="Video 5"){

      this.restapi.dialogRefVideo5.close();
    }else if(this.restapi.messageModal=="Video 7"){

      this.restapi.dialogRefVideo7.close();
    }

    this.restapi.messageModal = "Video 5"

    this.restapi.dialogRefVideo5 = this.dialog.open(ViewScoreComponent, {
      width: '550px',height: '400px',
      // data: {name: this.name, animal: this.animal,'test':'test'}
    });

       

  }

  viewModal7(){


    console.log(this.restapi.messageModal)
    if(this.restapi.messageModal=="Video 1"){
      
      this.restapi.dialogRefVideo.close();
    }else if(this.restapi.messageModal=="Video 2"){

      this.restapi.dialogRefVideo2.close();
    }else if(this.restapi.messageModal=="Video 3"){

      this.restapi.dialogRefVideo3.close();
    }else if(this.restapi.messageModal=="Video 4"){

      this.restapi.dialogRefVideo4.close();
    }else if(this.restapi.messageModal=="Video 5"){

      this.restapi.dialogRefVideo5.close();
    }else if(this.restapi.messageModal=="Video 7"){

      this.restapi.dialogRefVideo7.close();
    }
    this.restapi.messageModal = "Video 7"

    this.restapi.dialogRefVideo7 = this.dialog.open(ViewScoreComponent, {
      width: '550px',height: '400px',
      // data: {name: this.name, animal: this.animal,'test':'test'}
    });

       

  }

}
