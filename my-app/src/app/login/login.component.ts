import { Component, OnInit } from '@angular/core';
import { RestapiService } from '../restapi.service';
import {NgForm} from '@angular/forms';

@Component({ 
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  animal: string;
  name: string;
  wrong : boolean = false;

  constructor(private restapi : RestapiService) { }

  login(event){

    this.restapi.loginUser(event)
    .subscribe(
        (val:any) => {
            console.log("POST call successful value returned in body",val);
            localStorage.setItem(this.restapi.TOKEN_KEY, val.token)
            if(this.restapi.isAuthenticated){
                location.reload();
            }else{
                console.log("Registration Failed")
            }   

        },
        response => {
          console.log("POST call in error", response.token);
          this.wrong = true;

        },
        () => {
          console.log("The POST observable is now completed.");
    }); 

  }

  openDialog(){


  }

  ngOnInit(): void {



  }

}
