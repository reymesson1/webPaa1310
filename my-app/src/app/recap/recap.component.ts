import { Component, OnInit } from '@angular/core';
import { RestapiService} from '../restapi.service';

@Component({
  selector: 'app-recap',
  templateUrl: './recap.component.html',
  styleUrls: ['./recap.component.css']
})
export class RecapComponent implements OnInit {

  constructor(public restapi : RestapiService) { }

  win: string;
  loss: string;
  draw: string;
  recap: any[] = [];

  ngOnInit(): void {

      // this.restapi.getRecapGame()
      // .subscribe(data => data.map(dat=>{
      //   console.log(dat)
      // }))
      this.restapi.getRecapGame()
      .subscribe(
        (data : any) => {
        console.log(data);
        this.recap = data    
      })    

  }

}
