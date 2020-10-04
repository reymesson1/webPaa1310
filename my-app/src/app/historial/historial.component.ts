import { Component, OnInit } from '@angular/core';
import { RestapiService } from 'src/app/restapi.service';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit {

  username : string = "";
  historial: any[] = [];

  constructor(public restapi : RestapiService) { }

  ngOnInit(): void { 
    
    this.username = localStorage.getItem('username');

    this.restapi.getHistorial()
    .subscribe(
        (data : any) => {
      // console.log(data);
      this.historial = data    
    })    
    
  }

  loadHistory(id, isActive){

    this.restapi.actualId = id;

    if(isActive){

      this.restapi.historyActive = true;
    }


    console.log(id);

  }



}
