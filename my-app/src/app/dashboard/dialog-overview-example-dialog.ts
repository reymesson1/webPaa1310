import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { RestapiService, Task } from '../restapi.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
    selector: 'dialog-overview-example-dialog',
    templateUrl: 'dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialog {

    message : string;
    isScore : boolean = false;
    actualId : number = 0;
    isStarted : boolean = false;

    constructor(private cdr: ChangeDetectorRef, private restapi : RestapiService,public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,@Inject(MAT_DIALOG_DATA) public data: DialogData) 
    {}

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

    }

}

export interface DialogData {
    animal: string;
    name: string;
}  