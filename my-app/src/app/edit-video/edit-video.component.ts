import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { RestapiService } from '../restapi.service'; 

@Component({
  selector: 'app-edit-video',
  templateUrl: './edit-video.component.html',
  styleUrls: ['./edit-video.component.css']
})
export class EditVideoComponent implements OnInit {

  selectedData = []

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private restapi:RestapiService) { }

  ngOnInit(): void {

    this.restapi.getEditVideo(this.data._id)
    .subscribe(
      (val:any) => {
            console.log("POST call successful value returned in body",val);
            this.selectedData = val[0]
        },
        response => {
          console.log("POST call in error", response.token);
        },
        () => {
          console.log("The POST observable is now completed.");
    }); 

  }

  edit(id,event){

    console.log(id)
    console.log(event);

  }

}
