import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Http,Jsonp } from '@angular/http';
import {   Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
 
import 'rxjs/add/operator/map';

@Injectable()
export class LoginService {
	//   private previousEmail = new BehaviorSubject<any>('email');
	// currentEmail = this.previousEmail.asObservable();

  constructor(private http:Http,private jsonp:Jsonp ) { }

 login(email:any,password:any){
 	// this.previousEmail.next(email);
  	 let myHeaders = new Headers();
		myHeaders.set('Content-Type', 'application/json');
		// myHeaders.append('Access-Control-Allow-Origin','*');   
		let myParams = new URLSearchParams();
		myParams.set('username' , email);
		myParams.set('password' , password); 
		let options = new RequestOptions({ headers: myHeaders, params: myParams });
		return this.http.get('http://192.168.0.8:7003/soa-infra/resources/default/LoginValidation!1.0/RestService/',options)
		.map(res => res.json());
  } 
  loginGetRecords(email:any){
  	let myHeaders = new Headers();
		myHeaders.set('Content-Type', 'application/json');
		let myParams = new URLSearchParams();
		myParams.set('username' , email); 
		let options = new RequestOptions({ headers: myHeaders, params: myParams });
		return this.http.get('http://192.168.0.8:7003/soa-infra/resources/default/Sel_MUl_HRU_f!1.0/RestService/',options)
		.map(res => res.json()) ;

  } 
}