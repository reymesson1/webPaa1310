import { Component, OnInit } from '@angular/core';
import { RestapiService } from '../restapi.service';
import {NgForm} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  currentValue : string = "editmode2"
  userEditArr
  editMode : boolean = false
  permission
  animal: string;
  name: string = "Registration"
  durationInSeconds = 5;
  btn_enable : boolean = false;
  constructor(private restapi : RestapiService, private _snackBar: MatSnackBar) { }

  openSnackBar() {
    this._snackBar.openFromComponent(PizzaPartyComponent, {
      duration: this.durationInSeconds * 1000,
    });
  }

  register(event){

    this.openSnackBar();

    this.btn_enable = true;

    if(this.editMode){

      this.restapi.updateUserRegistration(event);

    }else{

      this.restapi.sendUserRegistration(event);
    }
    
  }

  openDialog(){


  }

  ngOnInit(): void {

    this.permission = localStorage.getItem('permission')

    this.editMode = this.restapi.userEditMode

    this.userEditArr = this.restapi.userEditArr

  }
}

@Component({
  selector: 'snack-bar-component-example-snack',
  templateUrl: 'snack-bar-component-example-snack.html',
  styles: [`
    .example-pizza-party {
      color: hotpink;
    }
  `],
})
export class PizzaPartyComponent {}