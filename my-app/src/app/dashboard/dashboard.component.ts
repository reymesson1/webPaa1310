import { Component, OnInit, Inject, ChangeDetectorRef, AfterViewInit, ViewChild } from '@angular/core';
import { RestapiService, Task, Column } from '../restapi.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogOverviewExampleDialog } from './dialog-overview-example-dialog';
import { LoginComponent } from '../login/login.component';
import { UserComponent } from '../user/user.component';
import { LoadingComponent } from '../loading/loading.component';
import {NgForm} from '@angular/forms';
import * as moment from 'moment';
import {MatPaginator} from '@angular/material/paginator';
import { ViewScoreComponent } from '../view-score/view-score.component';

 
@Component({ 
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  constructor(private restapi : RestapiService, public dialog: MatDialog, private cdr: ChangeDetectorRef) {}

  users: Task[] = [];
  columns: Column[] = [];
  animal: string; 
  name: string;
  temp : number = 0;
  dataIn : number = 0;
  timeLeft: number = 60;
  interval;
  cierto: boolean = false;
  time: number = 0;
  play : boolean = false;
  dialogRef
  dialogRefLoading
  dialogRefVideo
  dialogRefVideo2
  dialogRefVideo3
  dialogRefvideo4
  filterStatus = '';
  length = 90;
  pageSize = 10;
  pageSizeOptions = [5, 10, 25, 100];
  isAuthenticated : boolean = false;
  isLoading : boolean = false;
  
  ngOnInit(): void { 

    // this.openDialogLoading();

    this.isAuthenticated = this.restapi.isAuthenticated;

    this.users = this.restapi.tasks; 

    // this.columns = this.restapi.columns;

    this.restapi.getMaster()
    .subscribe((data:any) => data.map((dat:any)=>{
      console.log(dat)
      this.columns.push(dat)
    }));

    // this.restapi.getMasterToken()
    // .subscribe(
    //     (val:any) => {
    //         console.log("POST call successful value returned in body",val);
    //         this.columns = val
    //     },
    //     response => {
    //       console.log("POST call in error", response.token);
    //     },
    //     () => {
    //       console.log("The POST observable is now completed.");
    // });


    // if(!this.restapi.isAuthenticated){
    //   this.openDialogLogin()
    // }    

    if(this.restapi.isAuthenticated){
      // this.openDialog()
    }    

    
  }

  PageEvents(event) {
  
    console.log(event.pageSize)
    this.restapi.setColumnSortTop(event.pageSize)
    .subscribe(
        (val:any) => {
            console.log("POST call successful value returned in body",val);
            this.columns = val
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
  
  ngAfterViewInit(){

    // if(this.restapi.isLoading){

      // this.openDialogLoading();
    // }
    // }else{
      
    //   this.dialogRefLoading;
    // }
    
    this.cdr.detectChanges();


    // console.log(this.paginator)


  }
  // ngAfterViewChecked(){
    
  //   if(this.restapi.isStarted){
      
  //     this.startTimer();
  //     this.timeLeft = 60;
  //     this.restapi.isStarted = false;
  //   }

  //   if(this.restapi.muestrameTablero){



  //     this.restapi.updateColumns(this.restapi.actualId-1,this.columns)
  //     .subscribe(
  //         (data : any) => {
  //           // this.historial = data   
  //           data.map((dat:any)=>{
  //             console.log(dat);
  //         // this.restapi.columns = dat.columns
  //       })
  
  //     })    
  

  //     this.restapi.muestrameTablero = false;
      


  //   }

  //   if(this.restapi.historyActive){


  //     this.restapi.setColumnCustom(this.restapi.actualId)
  //     .subscribe(
  //         (data : any) => {
  //           // this.historial = data   
  //           data.map((dat:any)=>{
  //             // console.log(dat.columns);
  //          this.columns = dat.columns
  //       })
  
  //     })      


  //     this.dialogRef.close('Pizza!');



      

  //     this.restapi.historyActive = false;



  //   }

  //   this.cdr.detectChanges();

  // }

  startTimer() {
    this.play = true;
    this.interval = setInterval(() => {
      this.time++;
      if(this.time==60){
          this.restapi.message = "Timeout";
          this.openDialog();
          this.pauseTimer();
      }
    },1000)
  }
  
  pauseTimer() {
    this.play = false;
    clearInterval(this.interval);
    // setTimeout(() => {
    //   window.location.reload();
    // }, 2000);
  }


  sortByAsc(){

    console.log('asc');

    this.restapi.getColumnSortAsc()
    .subscribe(
    (val:any) => {
        console.log("POST call successful value returned in body",val);
        this.columns = val;
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


    


    // let sorted :any = this.columns.sort((a,b:any)=>{
    //   var da = new Date((<any>a).date).getTime();
    //   var db = new Date((<any>b).date).getTime();
      
    //   return da < db ? -1 : da > db ? 1 : 0
    // });


    // console.log(sorted)

    // this.columns = sorted;


  }

  sortByDes(){

    this.restapi.getColumnSortDes()
    .subscribe(
    (val:any) => {
        console.log("POST call successful value returned in body",val);
        this.columns = val
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

  checkAdjacent(columnId, rowId){

    // //horizontal by row
    for(let x=0;x<6;x++){

      for(let y=0;y<9;y++){
        
        if(this.columns[y].rows[x].color=="red"&&this.columns[y+1].rows[x].color=="red"&&this.columns[y+2].rows[x].color=="red"&&this.columns[y+3].rows[x].color=="red"){

          this.restapi.message = "Won Red";          
          this.openDialog();
        }

      }

    }


    // //vertical
    for(let x=0;x<12;x++){

      for(let y=0;y<4;y++){
        
        if(this.columns[x].rows[y].color=="red"&&this.columns[x].rows[y+1].color=="red"&&this.columns[x].rows[y+2].color=="red"&&this.columns[x].rows[y+3].color=="red"){

          this.restapi.message = "Won Red";
          this.openDialog();
        }

      }
    }

    // //diagonal horizontal
    //me queda pendiente 0-2 y 0-1 | 7-0 y 8-0    
    for(let x=0;x<7;x++){
      for(let y=0;y<3;y++){
        if(y==0){          
          if(this.columns[x].rows[y].color=="red"&&this.columns[x+1].rows[y+1].color=="red"&&this.columns[x+2].rows[y+2].color=="red"&&this.columns[x+3].rows[y+3].color=="red"){

            this.restapi.message = "Won Red";
            this.openDialog();
          }
        }else if(y==1){          
          if(this.columns[x+1].rows[y].color=="red"&&this.columns[x+2].rows[y+1].color=="red"&&this.columns[x+3].rows[y+2].color=="red"&&this.columns[x+4].rows[y+3].color=="red"){

            this.restapi.message = "Won Red";
            this.openDialog();
          }
        }else if(y==2){          
          if(this.columns[x+2].rows[y].color=="red"&&this.columns[x+3].rows[y+1].color=="red"&&this.columns[x+4].rows[y+2].color=="red"&&this.columns[x+5].rows[y+3].color=="red"){

            this.restapi.message = "Won Red";
            this.openDialog();
          }
        }
      }
    }

    // //diagonal vertical
    for(let x=0;x<1;x++){
      for(let y=5;y>=3;y--){

        if(y==5){

          if(this.columns[x].rows[y].color=="red"&&this.columns[x+1].rows[y-1].color=="red"&&this.columns[x+2].rows[y-2].color=="red"&&this.columns[x+3].rows[y-3].color=="red"){

            this.restapi.message = "Won Red";           
            this.openDialog();
          }
        }else if(y==4){

          if(this.columns[x-1*-1].rows[y].color=="red"&&this.columns[x-2*-1].rows[y-1].color=="red"&&this.columns[x-3*-1].rows[y-2].color=="red"&&this.columns[x-4*-1].rows[y-3].color=="red"){

           this.restapi.message = "Won Red";
            this.openDialog();
          }
        }else if(y==3){

          if(this.columns[x-1*-2].rows[y].color=="red"&&this.columns[x-1*-2+1].rows[y-1].color=="red"&&this.columns[x+3*-1+1].rows[y-2].color=="red"&&this.columns[x+4*-1+1].rows[y-3].color=="red"){
           
            this.restapi.message = "Won Red";
            this.openDialog();
          }

        }
  
      }
    }


 
  }

  checkAdjacentThree(columnId, rowId) : any{

    // //horizontal by row
    for(let x=0;x<6;x++){

      for(let y=0;y<9;y++){
        
        if(this.columns[y].rows[x].color=="blue"&&this.columns[y+1].rows[x].color=="blue"){

          setTimeout(() => {
            
            this.columns[y+3].rows[x].color="red";
          }, 2000);
        }

      }

    }


    // //vertical
    for(let x=0;x<12;x++){

      for(let y=0;y<4;y++){
        
        if(this.columns[x].rows[y+1].color=="blue"&&this.columns[x].rows[y+2].color=="blue"){
          
          setTimeout(() => {
            
            this.columns[x].rows[y-1].color="red";
          }, 2000);
        }

      }
    }

    // //diagonal horizontal
    //me queda pendiente 0-2 y 0-1 | 7-0 y 8-0    
    for(let x=0;x<7;x++){
      for(let y=0;y<3;y++){
        if(y==0){          
          if(this.columns[x].rows[y].color=="blue"&&this.columns[x+1].rows[y+1].color=="blue"&&this.columns[x+2].rows[y+2].color=="blue"){

            this.restapi.message = "Hay solo tres";
            this.openDialog();
          }
        }else if(y==1){          
          if(this.columns[x+1].rows[y].color=="blue"&&this.columns[x+2].rows[y+1].color=="blue"&&this.columns[x+3].rows[y+2].color=="blue"){

            this.restapi.message = "Hay solo tres";
            this.openDialog();
          }
        }else if(y==2){          
          if(this.columns[x+2].rows[y].color=="blue"&&this.columns[x+3].rows[y+1].color=="blue"&&this.columns[x+4].rows[y+2].color=="blue"){

            this.restapi.message = "Hay solo tres";
            this.openDialog();
          }
        }
      }
    }

    // //diagonal vertical
    for(let x=0;x<1;x++){
      for(let y=5;y>=3;y--){

        if(y==5){

          if(this.columns[x].rows[y].color=="blue"&&this.columns[x+1].rows[y-1].color=="blue"&&this.columns[x+2].rows[y-2].color=="blue"){

            this.restapi.message = "Hay solo tres";           
            this.openDialog();
          }
        }else if(y==4){

          if(this.columns[x-1*-1].rows[y].color=="blue"&&this.columns[x-2*-1].rows[y-1].color=="blue"&&this.columns[x-3*-1].rows[y-2].color=="blue"){

           this.restapi.message = "Hay solo tres";
            this.openDialog();
          }
        }else if(y==3){

          if(this.columns[x-1*-2].rows[y].color=="blue"&&this.columns[x-1*-2+1].rows[y-1].color=="blue"&&this.columns[x+3*-1+1].rows[y-2].color=="blue"){
           
            this.restapi.message = "Hay solo tres";
            this.openDialog();
          }

        }
  
      }
    }


 
  }

  openDialog(): void {

    if(this.restapi.isAuthenticated){

    

      this.dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
        width: '800px',
        data: {name: this.name, animal: this.animal}
      });

      // this.dialogRef.disableClose = true;

      this.dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        this.animal = result;
      });
      
  //getcounter    
      this.restapi.getCounter()
      .subscribe((data:any) => data.map(dat=>{
        // console.log(dat)
        this.dataIn = dat.quantity
        // this.restapi.setMaster(this.columns,dat.quantity);

      }));
    }else{

      this.openDialogLogin();
    }

  }

  openDialogLogin(): void {

    const dialogRef = this.dialog.open(UserComponent, {
      width: '450px',
      data: {name: this.name, animal: this.animal,'test':'test'}
    });

    // dialogRef.disableClose = true;


    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed');
    //   this.animal = result;
    // });
  

  }

  openDialogLoading(){

    
    // width: '150px',height: '110px',
    this.dialogRefLoading = this.dialog.open(LoadingComponent, {
      width: '150px',height: '150px',
      data: {name: this.name, animal: this.animal,'test':'test'}
    });

    this.dialogRefLoading.disableClose = true;


  }
  openDialogVideo(filename){

    this.restapi.messageModal = "Video 1"
    
    // width: '150px',height: '110px',
    this.restapi.dialogRefVideo = this.dialog.open(ViewScoreComponent, {
      width: '550px',height: '400px',
      data: {name: this.name, animal: this.animal,'test':'test'}
    });

    this.restapi.filename = filename;

    // this.dialogRefLoading.disableClose = true;

  }

  openDialogVideo2(){

    this.restapi.dialogRefVideo.close();

    this.restapi.dialogRefVideo2 = this.dialog.open(ViewScoreComponent, {
      width: '750px',height: '750px',
      data: {name: this.name, animal: this.animal,'test':'test'}
    });

  
  }



  onClick(columnId,rowId){

    if(!this.restapi.isStarted){
      
      this.pauseTimer();
      this.time = 0;
      this.startTimer();
    }

    for(var x=0;x<2;x++){
        
        var movement = Math.floor( Math.random() * 12 )
        
        if(this.restapi.player){

            setTimeout(() => {
              this.openDialogLoading();
            }, 1000);

            setTimeout(() => {
              
              this.checkLocation(movement,rowId);
              this.columns[movement].rows[rowId].color="red";
              this.restapi.player = !this.restapi.player;
            }, 5000);

            setTimeout(() => {
              this.dialogRefLoading.close();
            }, 8000);

          }else{
            
              this.checkLocation(columnId,rowId);
              this.checkAdjacentThree(columnId,rowId);
              this.columns[columnId].rows[rowId].color="blue";
              this.restapi.player = !this.restapi.player;    


        }
    }//endfor

  }

  checkLocation(columnId,rowId){

    var color = "blue";
    if(this.restapi.player){
      color = "red"
    }


    //chequea en esa column cuando grayes hay.
    let downCount = 0;
    for(let x=0;x<6;x++){ 
      // console.log(this.columns[columnId].rows[x].color);
      if(this.columns[columnId].rows[x].color=="gray"){
        downCount++;
      }
    }

    for(let x=0,y=500;x<downCount-1;x++,y+=500){
      setTimeout(() => {

        this.columns[columnId].rows[x].color="gray";
        
      }, y);
      setTimeout(() => {
        
        this.columns[columnId].rows[x+1].color=color;
        this.checkAdjacent(columnId,rowId);

      }, y);
    }

  }



}
