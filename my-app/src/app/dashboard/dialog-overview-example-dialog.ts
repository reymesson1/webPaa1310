import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { RestapiService, Task } from '../restapi.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
    selector: 'dialog-overview-example-dialog',
    templateUrl: 'dialog-overview-example-dialog.html',
    styleUrls: ['./dialog-overview-example-dialog.css']

})
export class DialogOverviewExampleDialog {

    message : string;
    isScore : boolean = false;
    actualId : number = 0;
    isStarted : boolean = false;
    fileToUpload: File = null;
    fileName : String = "";


    constructor(private cdr: ChangeDetectorRef, private restapi : RestapiService,public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,@Inject(MAT_DIALOG_DATA) public data: DialogData) 
    {}

    handleFileInput(files: FileList) {
        this.fileToUpload = files.item(0);
        // this.restapiservice.uploadFileExcelExams(this.fileToUpload);
        this.restapi.updateBucket(this.fileToUpload);
        console.log(this.fileToUpload);
        this.fileName = this.fileToUpload.name;
    }
    

    handleFileInput2(event){
        // console.log(event);
        this.restapi.updateBucket(event)    
        // this.restapi.getBucket()
        // .subscribe(
        //     (val) => {
        //         console.log("POST call successful value returned in body",val);
        //         // this.columns = val[0];
        //         // this.columnsTwo = val[0].columns
        //         // return val;
        //     },
        //     response => {
        //     console.log("POST call in error", response.token);
        //     },
        //     () => {
        //     console.log("The POST observable is now completed.");
        // });



    }

    ngAfterViewChecked(){

        this.isStarted = this.restapi.isStartedComp;

        this.cdr.detectChanges();

    }

    ngOnInit(): void { 
    
        this.message = this.restapi.message;
        this.restapi.getCounter()
        .subscribe(
            (val:any) => {
                console.log("POST call successful value returned in body",val);
                val.map((data:any)=>{
                    console.log(data.quantity)
                    this.actualId = data.quantity;
                })
                // console.log(val.quantity)
            },
            response => {
            console.log("POST call in error", response.token);
            },
            () => {
            console.log("The POST observable is now completed.");
        });

    }

    
    viewScore(){

        this.isScore = !this.isScore;
    }

    saveState(){

        this.restapi.actualId = this.actualId;
        console.log('saveState ' + this.actualId);
        this.restapi.muestrameTablero = true;
    }

    createJob(){

        console.log("creating a job");

        this.restapi.creatingJob(this.fileName);

        this.dialogRef.close();

    }

    reset(){

        this.restapi.setMaster(this.restapi.columns, this.actualId);

        this.restapi.actualId = this.actualId;

        this.restapi.isStartedComp = true;

        for(var x=0;x<(<any>this.restapi.columns).length;x++){

            for(var y=0;y<(<any>this.restapi.columns[x].rows).length;y++){
                this.restapi.columns[x].rows[y].color = "gray";
            }
            
        }

        this.restapi.player = false;

        // setcounter
        this.restapi.setCounter()
        .subscribe((data:any) => data.map(dat=>{
        console.log(dat)
        }));

        
        this.dialogRef.close();

        setTimeout(() => {
            
            window.location.reload();
        }, 2000);

    }

}

export interface DialogData {
    animal: string;
    name: string;
}  