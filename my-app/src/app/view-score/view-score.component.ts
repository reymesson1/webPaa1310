import { Component, OnInit } from '@angular/core';
import { RestapiService } from '../restapi.service'; 

@Component({
  selector: 'app-view-score',
  templateUrl: './view-score.component.html',
  styleUrls: ['./view-score.component.css']
})
export class ViewScoreComponent implements OnInit {

  message : String = ""

  constructor(public restapi : RestapiService) { }

  ngOnInit(): void {

    this.message = this.restapi.messageModal 
  }

  viewModal(){

  }

}
