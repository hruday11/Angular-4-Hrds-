import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { LocalStorageService } from 'angular-2-local-storage';
import {   Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';

@Injectable()
export class InboxService {

  constructor(private http:Http,private localStorageService:LocalStorageService) { }

  inbox(){
 	// this.previousEmail.next(email);
 	let email = JSON.stringify(this.localStorageService.get('email'));
  	 let myHeaders = new Headers();
		myHeaders.set('Content-Type', 'application/json');
		myHeaders.append('Access-Control-Allow-Origin','*');   
		let myParams = new URLSearchParams();
		myParams.set('username' , email); 
		let options = new RequestOptions({ headers: myHeaders, params: myParams });
		return this.http.get('http://192.168.0.8:7003/soa-infra/resources/default/Sel_MUl_HRU_f!1.0/RestService/',options)
		.map(res => res.json()) ;

  } 
}
