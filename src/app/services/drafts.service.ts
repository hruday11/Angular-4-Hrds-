import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { LocalStorageService } from 'angular-2-local-storage';
import {   Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'; 

@Injectable()
export class DraftsService {

  constructor( private http:Http,private localStorageService:LocalStorageService) { }

  getDrafts(){
    let email1 = JSON.stringify(this.localStorageService.get('email'));
    console.log(JSON.parse(email1));
    let email = JSON.parse(email1); 
  	let myHeaders = new Headers();
  	myHeaders.set('Content-Type','application/json');
  	// myHeaders.append('Access-Control-Allow-Origin','*');  
  	let myParams = new URLSearchParams();
  	myParams.set('username', email);
  	let options = new RequestOptions({headers:myHeaders,params:myParams})  
  	return this.http.get('http://192.168.0.8:7003/soa-infra/resources/default/Get_Drafts_Hru!1.0/RestService/',options)
    .map(res=>res.json());

  }

}
