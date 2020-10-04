import { Component, OnInit } from '@angular/core';
import { RestapiService } from 'src/app/restapi.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {

  constructor(public restapi : RestapiService) { }

  ngOnInit(): void {
  }

}
