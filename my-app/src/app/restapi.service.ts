import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as moment from 'moment';


@Injectable({
  providedIn: 'root'
})
export class RestapiService {

  isLoading : boolean = false;
  filename : String = ""
  dialogRefEditVideo
  dialogRefLoading
  dialogRefVideo
  dialogRefVideo2
  dialogRefVideo3
  dialogRefVideo4
  dialogRefVideo5
  dialogRefVideo7
  messageModal = "";
  userEditArr
  userEditMode : boolean = false;
  openProfile : boolean = false;
  isActive: boolean = false;
  closeRegister : boolean = false;
  username : string = "";
  status : string = "loss"
  historyActive : boolean = false;
  actualId : number = 0;
  muestrameTablero : boolean = false;
  message = "Welcome to Connect 4 Game";
  users = [];
  TOKEN_KEY = 'token'
  // path = "http://localhost:8083/";
  path = "http://167.172.143.106:8083/";
  
  authPath = this.path + '/login';

  isStarted : boolean = false;

  isStartedComp : boolean = false;

  player: boolean = false;//blue

  columnsTwo: Column[] = [];

  columns: Column[] = [
    new Column(0, [new Task(0,"name","gray"),
                    new Task(1,"name","gray"),
                    new Task(2,"name","gray"),
                    new Task(3,"name","gray"),
                    new Task(4,"name","gray"),
                    new Task(5,"name","gray")]),
    new Column(1, [new Task(0,"name","gray"),
                    new Task(1,"name","gray"),
                    new Task(2,"name","gray"),
                    new Task(3,"name","gray"),
                    new Task(4,"name","gray"),
                    new Task(5,"name","gray")]),
    new Column(2, [new Task(0,"name","gray"),
                    new Task(1,"name","gray"),
                    new Task(2,"name","gray"),
                    new Task(3,"name","gray"),
                    new Task(4,"name","gray"),
                    new Task(5,"name","gray")]),
    new Column(3, [new Task(0,"name","gray"),
                    new Task(1,"name","gray"),
                    new Task(2,"name","gray"),
                    new Task(3,"name","gray"),
                    new Task(4,"name","gray"),
                    new Task(5,"name","gray")]),
    new Column(4, [new Task(0,"name","gray"),
                    new Task(1,"name","gray"),
                    new Task(2,"name","gray"),
                    new Task(3,"name","gray"),
                    new Task(4,"name","gray"),
                    new Task(5,"name","gray")]),
    new Column(5, [new Task(0,"name","gray"),
                    new Task(1,"name","gray"),
                    new Task(2,"name","gray"),
                    new Task(3,"name","gray"),
                    new Task(4,"name","gray"),
                    new Task(5,"name","gray")]),
    new Column(6, [new Task(0,"name","gray"),
                    new Task(1,"name","gray"),
                    new Task(2,"name","gray"),
                    new Task(3,"name","gray"),
                    new Task(4,"name","gray"),
                    new Task(5,"name","gray")]),
    new Column(7, [new Task(0,"name","gray"),
                    new Task(1,"name","gray"),
                    new Task(2,"name","gray"),
                    new Task(3,"name","gray"),
                    new Task(4,"name","gray"),
                    new Task(5,"name","gray")]),
    new Column(8, [new Task(0,"name","gray"),
                    new Task(1,"name","gray"),
                    new Task(2,"name","gray"),
                    new Task(3,"name","gray"),
                    new Task(4,"name","gray"),
                    new Task(5,"name","gray")]),
    new Column(9, [new Task(0,"name","gray"),
                    new Task(1,"name","gray"),
                    new Task(2,"name","gray"),
                    new Task(3,"name","gray"),
                    new Task(4,"name","gray"),
                    new Task(5,"name","gray")]),
    new Column(10, [new Task(0,"name","gray"),
                    new Task(1,"name","gray"),
                    new Task(2,"name","gray"),
                    new Task(3,"name","gray"),
                    new Task(4,"name","gray"),
                    new Task(5,"name","gray")]),
    new Column(11, [new Task(0,"name","gray"),
                    new Task(1,"name","gray"),
                    new Task(2,"name","gray"),
                    new Task(3,"name","gray"),
                    new Task(4,"name","gray"),
                    new Task(5,"name","gray")]),
  ]

  tasks: Task[] = [  ];

  constructor(private http: HttpClient, private route: Router){}

  get token(){
    return localStorage.getItem(this.TOKEN_KEY);
  }

  get isAuthenticated(){
      return !!localStorage.getItem(this.TOKEN_KEY)
  }

  logout(){
      localStorage.removeItem(this.TOKEN_KEY);
  }

  getUsers() {
      this.http.get<any>(this.path +'/users').subscribe(res =>{
          this.users = res
      })
  }

  getProfile(id) {
      return this.http.get(this.path +'/profile/' + id)
  }

  sendUserRegistration(loginData) { 

    // this.http.post("http://localhost:8082/register",
    this.http.post(this.path+"register",
    {
      "id": "1",
      "username": loginData.value.username,
      "password": loginData.value.password,
      "name": loginData.value.name,
      "lastname": loginData.value.lastname,
      "permission": "1"
    },{headers: new HttpHeaders({"Authorization":"Bearer " + localStorage.getItem("token") })})
    .subscribe(
        (val:any) => {
            console.log("POST call successful value returned in body",val);
            localStorage.setItem(this.TOKEN_KEY, val.token)
            if(this.isAuthenticated){
                location.reload();
            }else{
                console.log("Registration Failed")
            }   

         },
        response => {
          console.log("POST call in error", response.token);

        },
        () => {
          console.log("The POST observable is now completed.");
    }); 



    // this.http.post<any>(this.authPath + '/register', regData).subscribe(res =>{ 
    //     console.log(res) 
    //     localStorage.setItem(this.TOKEN_KEY, res.token)  
    //     if(this.isAuthenticated){
    //         this.route.navigateByUrl("/")
    //     }else{
    //         console.log("Registration Failed")
    //     }     
    // })
    
  }

  loginUser(loginData) {

    this.username = loginData.value.username;

    localStorage.setItem('username', this.username);

    // this.http.post("http://localhost:8082/login",
    return this.http.post(this.path+"login",
    {
      "id": "1",
      "username": loginData.value.username,
      "password": loginData.value.password
    },{headers: new HttpHeaders({"Authorization":"Bearer " + localStorage.getItem("token") })})

  };

  getMaster(){

    // return this.http.post(this.path+"column",
    // {
    //   "date": moment().format("YYYY-MM-DD hh:mm"),
    //   "token": this.token
    // },{headers: new HttpHeaders({"Authorization":"Bearer " + localStorage.getItem("token") })})

    // return this.http.get("http://localhost:8082/columns",
    return this.http.get(this.path+"columns",
    {headers: new HttpHeaders({"Authorization":"Bearer " + localStorage.getItem("token") })})
    // .subscribe(
    //     (val) => {
    //         console.log("POST call successful value returned in body",val[0].columns);
    //         // this.columns = val[0];
    //         this.columnsTwo = val[0].columns
    //         // return val;
    //      },
    //     response => {
    //       console.log("POST call in error", response.token);
    //     },
    //     () => {
    //       console.log("The POST observable is now completed.");
    // });


  }

  getMasterToken(){

    return this.http.post(this.path+"columnstoken",
    {
      "date": moment().format("YYYY-MM-DD hh:mm"),
      "token": this.token
    },{headers: new HttpHeaders({"Authorization":"Bearer " + localStorage.getItem("token") })})


  }

  setMaster(dataId,filename,event){

    // this.http.post("http://localhost:8082/column",
    this.http.post(this.path+"column",
    {
      "id": dataId,
      "date": moment().format("YYYY-MM-DD hh:mm"),
      "name": filename,
      "title": event.value.title,
      "description": event.value.description,
      "status": this.status,
      "isActive": true,
      "creator": this.token
    },{headers: new HttpHeaders({"Authorization":"Bearer " + localStorage.getItem("token") })})
    .subscribe(
        (val) => {
            console.log("POST call successful value returned in body",val);
         },
        response => {
          console.log("POST call in error", response.token);
        },
        () => {
          console.log("The POST observable is now completed.");
    });
    

  }

  getRecapGame(){

    // return this.http.get("http://localhost:8082/gamerecap",
    // {headers: new HttpHeaders({"Authorization":"Bearer " + localStorage.getItem("token") })})

    // return this.http.post("http://localhost:8082/gamerecap",
    return this.http.post(this.path+"gamerecap",
    {
      "id": "1",
      "date": moment().format("YYYY MM DD"),
      "token": this.token
    },{headers: new HttpHeaders({"Authorization":"Bearer " + localStorage.getItem("token") })})


  }

  getHistorial(){

    // return this.http.get("http://localhost:8082/historial",
    // {headers: new HttpHeaders({"Authorization":"Bearer " + localStorage.getItem("token") })})

    // return this.http.post("http://localhost:8082/historial",
    return this.http.post(this.path+"historial",
    {
      "id": "1",
      "date": moment().format("YYYY MM DD"),
      "token": this.token
    },{headers: new HttpHeaders({"Authorization":"Bearer " + localStorage.getItem("token") })})


  }

  getCounter(){

    // return this.http.get("http://localhost:8082/getcounter",
    return this.http.get(this.path+"getcounter",
    {headers: new HttpHeaders({"Authorization":"Bearer " + localStorage.getItem("token") })})
    // .subscribe(
    //     (val) => {
    //         console.log("POST call successful value returned in body",val[0].columns);
    //         // this.columns = val[0];
    //         this.columnsTwo = val[0].columns
    //         // return val;
    //      },
    //     response => {
    //       console.log("POST call in error", response.token);
    //     },
    //     () => {
    //       console.log("The POST observable is now completed.");
    // });


  }

  setCounter(){

    // return this.http.get("http://localhost:8082/setcounter",
    return this.http.get(this.path+"setcounter",
    {headers: new HttpHeaders({"Authorization":"Bearer " + localStorage.getItem("token") })})
    // .subscribe(
    //     (val) => {
    //         console.log("POST call successful value returned in body",val[0].columns);
    //         // this.columns = val[0];
    //         this.columnsTwo = val[0].columns
    //         // return val;
    //      },
    //     response => {
    //       console.log("POST call in error", response.token);
    //     },
    //     () => {
    //       console.log("The POST observable is now completed.");
    // });


  }

  setColumnCustom(id){

    // return this.http.post("http://localhost:8082/customcolumns",
    return this.http.post(this.path+"customcolumns",
    {
      "id": id,
      "date": moment().format("YYYY MM DD"),
      "token": this.token
    },{headers: new HttpHeaders({"Authorization":"Bearer " + localStorage.getItem("token") })})

  }

  updateColumns(id,columns){

    // return this.http.post("http://localhost:8082/customcolumns",
    return this.http.post(this.path+"updatecolumns",
    {
      "id": id,
      "date": moment().format("YYYY MM DD"),
      "columns": columns
    },{headers: new HttpHeaders({"Authorization":"Bearer " + localStorage.getItem("token") })})

  }
  
  getColumnSortAsc(){

    // return this.http.post("http://localhost:8082/customcolumns",
    return this.http.get(this.path+"columnsortasc",
     {headers: new HttpHeaders({"Authorization":"Bearer " + localStorage.getItem("token") })})

  }

  getColumnSortDes(){

    // return this.http.post("http://localhost:8082/customcolumns",
    return this.http.get(this.path+"columnsortdes",
     {headers: new HttpHeaders({"Authorization":"Bearer " + localStorage.getItem("token") })})

  }

  setColumnSortTop(top){

    // return this.http.post("http://localhost:8082/customcolumns",
    return this.http.post(this.path+"columnsorttop",
    {
      "top": top
    },{headers: new HttpHeaders({"Authorization":"Bearer " + localStorage.getItem("token") })})

  }

  getUser(){

    // return this.http.post("http://localhost:8082/customcolumns",
    return this.http.get(this.path+"user",
     {headers: new HttpHeaders({"Authorization":"Bearer " + localStorage.getItem("token") })})

  }

  updateUserRegistration(loginData) { 

    // this.http.post("http://localhost:8082/register",
    this.http.post(this.path+"updateregister",
    {
      "id": "1",
      "username": loginData.value.username,
      "name": loginData.value.name,
      "lastname": loginData.value.lastname,
      "permission": "1"
    },{headers: new HttpHeaders({"Authorization":"Bearer " + localStorage.getItem("token") })})
    .subscribe(
        (val:any) => {
            console.log("POST call successful value returned in body",val);
            localStorage.setItem(this.TOKEN_KEY, val.token)
            if(this.isAuthenticated){
                location.reload();
            }else{
                console.log("Registration Failed")
            }   

         },
        response => {
          console.log("POST call in error", response.token);

        },
        () => {
          console.log("The POST observable is now completed.");
    }); 



    // this.http.post<any>(this.authPath + '/register', regData).subscribe(res =>{ 
    //     console.log(res) 
    //     localStorage.setItem(this.TOKEN_KEY, res.token)  
    //     if(this.isAuthenticated){
    //         this.route.navigateByUrl("/")
    //     }else{
    //         console.log("Registration Failed")
    //     }     
    // })
    
  }

  getBucket(){

    // return this.http.post("http://localhost:8082/customcolumns",
    return this.http.get(this.path+"bucket",
     {headers: new HttpHeaders({"Authorization":"Bearer " + localStorage.getItem("token") })})

  }

  updateBucket(event){

    const formData: FormData = new FormData();
    formData.append('file', event, event.name);
    
    // const formData: FormData = new FormData();
    // formData.append('file', event, event.name);

    // this.http.post("http://localhost:8080/uploadexcel",
    return this.http.post(this.path+"updatebucket",
    formData,{headers: new HttpHeaders({"Authorization":"Bearer " + localStorage.getItem("token") })})


    // console.log(file)

    // this.http.post(this.path+"updatebucket",
    // {
    //   "id": "1",
    //   "files": file,
    // },{headers: new HttpHeaders({"Authorization":"Bearer " + localStorage.getItem("token") })})
    // .subscribe(
    //     (val:any) => {
    //         console.log("POST call successful value returned in body",val);    
    //     },
    //     response => {
    //       console.log("POST call in error", response.token);

    //     },
    //     () => {
    //       console.log("The POST observable is now completed.");
    // }); 


  }

  creatingJob(imagenew) { 

    // this.http.post("http://localhost:8082/register",
    this.http.post(this.path+"creatingjobbucket",
    {
      "id": "1",
      "image": imagenew
    },{headers: new HttpHeaders({"Authorization":"Bearer " + localStorage.getItem("token") })})
    .subscribe(
        (val:any) => {
            console.log("POST call successful value returned in body",val);
            localStorage.setItem(this.TOKEN_KEY, val.token)
            if(this.isAuthenticated){
                location.reload();
            }else{
                console.log("Registration Failed")
            }   

         },
        response => {
          console.log("POST call in error", response.token);

        },
        () => {
          console.log("The POST observable is now completed.");
    }); 



    // this.http.post<any>(this.authPath + '/register', regData).subscribe(res =>{ 
    //     console.log(res) 
    //     localStorage.setItem(this.TOKEN_KEY, res.token)  
    //     if(this.isAuthenticated){
    //         this.route.navigateByUrl("/")
    //     }else{
    //         console.log("Registration Failed")
    //     }     
    // })
    
  }

  deleteVideo(_id){

    return this.http.post(this.path+"deletevideo",
    {
      "id": _id,
    },{headers: new HttpHeaders({"Authorization":"Bearer " + localStorage.getItem("token") })})

  }

  getEditVideo(_id){

    return this.http.post(this.path+"geteditvideo",
    {
      "id": _id,
    },{headers: new HttpHeaders({"Authorization":"Bearer " + localStorage.getItem("token") })})

  }

  setEditVideo(_id,event){

    return this.http.post(this.path+"seteditvideo",
    {
      "id": _id,
      "title": event.value.title,
      "description": event.value.description
    },{headers: new HttpHeaders({"Authorization":"Bearer " + localStorage.getItem("token") })})

  }

  deleteUser(_id){

    return this.http.post(this.path+"deleteuser",
    {
      "id": _id,
    },{headers: new HttpHeaders({"Authorization":"Bearer " + localStorage.getItem("token") })})

  }


  




}

export class Task {
  id: number;
  name: string;
  color: string = "gray";
  modified: string;

  constructor(id:number, name:string,  color:string){

    this.id = id;
    this.name = name;
    this.color = color;
  }


}

export class Column {
  id: number;
  rows: Task

  constructor(id:number, rows){

    this.id = id;
    this.rows = rows
  }


}
