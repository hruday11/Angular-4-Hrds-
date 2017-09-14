import { CreateProjectsComponent } from '../component/create-projects/create-projects.component';
import { Injectable } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { LocalStorageService } from 'angular-2-local-storage';
import { LoginService } from    '../services/login.service'; 
import { CommonService } from '../services/common.service';
import { DraftsService } from '../services/drafts.service';
import { LoginComponent } from '../component/login/login.component';
import {   Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'; 

@Injectable()
export class DataService {
	headers: Headers;
	options: RequestOptions;
	public email : string;
	public password;
	public logindata;
	public data;
 
 constructor(private localStorageService:LocalStorageService,private draftsService:DraftsService,public http:Http,private loginService:LoginService,private commonService:CommonService) { 
		console.log('Data Service Connceted');
		this.headers = new Headers({ 'Content-Type': 'application/json','Accept': 'q=0.8;application/json;q=0.9' });
		this.options = new RequestOptions({ headers: this.headers });
	}

	getFinalDocs(projectName :any,description : any,resDocs:any,email:any ){ 
		let myHeaders = new Headers();
		myHeaders.set('Content-Type', 'application/json'); 
		let email1 = JSON.stringify(this.localStorageService.get('email'));
		this.email = JSON.parse(email1);
		let myParams1 = JSON.stringify({ project_name:projectName,URS:'URS',FunctionalSpecifications:'Functional Specifications',
	    project_desc:description,FunctionalDesign:'Functional Design',username : this.email,Scenario:resDocs.Scenario,
	    Complainces:resDocs.Complainces,Budget:resDocs.Budget,Role:resDocs.Role,Duration:resDocs.Duration,Size:resDocs.Size});
	    console.log(myParams1);
		return this.http.post('http://192.168.0.8:7003/soa-infra/resources/default/PostingData!1.0/RestService/',myParams1,{headers:myHeaders})
		.map(res => res.json());
	}

	createDrafts(projectName :any,description : any,resDocs:any,email:any ){ 
		let myHeaders = new Headers();
		myHeaders.set('Content-Type', 'application/json'); 
		let email1 = JSON.stringify(this.localStorageService.get('email'));
		this.email = JSON.parse(email1);
		let myParams1 = JSON.stringify({ project_name:projectName,URS:'URS',FunctionalSpecifications:'Functional Specifications',
	    project_desc:description,FunctionalDesign:'Functional Design',username : this.email,Scenario:resDocs.Scenario,
	    Complainces:resDocs.Complainces,Budget:resDocs.Budget,Role:resDocs.Role,Duration:resDocs.Duration,Size:resDocs.Size});
		// let myParams =  myParams1;
		console.log(myParams1);
		// let options = new RequestOptions({ headers: myHeaders, params: myParams1  });
		return this.http.post('http://192.168.0.8:7003/soa-infra/resources/default/ProDraftsPost!1.1/RestService/',myParams1,{headers:myHeaders})
		.map(res => res.json());
	}

}


 