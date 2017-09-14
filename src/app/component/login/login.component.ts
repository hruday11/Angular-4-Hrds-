import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { InboxService } from '../../services/inbox.service';
import { CommonService } from '../../services/common.service'; 
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { LocalStorageService } from 'angular-2-local-storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[LoginService,InboxService]
})
export class LoginComponent implements OnInit {
	public email :any;
	public password :any;
	public logindata : any;
  public error : any;


  constructor( private localStorageService:LocalStorageService,private loginService :LoginService,private router:Router,private commonService:CommonService ) { }

  ngOnInit() {
  }
  public ErrorAlert = '';
  loginTo(){ 
     if(this.email === undefined){
       this.ErrorAlert = "Enter A Username Or Email";
     }else if(this.password === undefined){
       this.ErrorAlert = "Enter Your Password";
     }else{
       this.localStorageService.set('email',this.email);
       this.loginService.login(this.email,this.password).subscribe(logindata => {
         this.logindata = logindata;
         if(this.email === logindata.result){
           console.log(logindata);
           this.router.navigate(['/myInbox']);
         } 
       },
       (error)=> {
         this.error=error; 
         let error1 = JSON.parse(error._body);
         if(error1.result === "Login Failed"){
         this.ErrorAlert = "Incorrect Email/Password";
         }
       })
     }
  } 

}
