import { Component, OnInit } from '@angular/core'; 
import { DataService } from '../../services/data.service';
import { LoginService } from '../../services/login.service';
import { CommonService } from '../../services/common.service';
import { DraftsService } from '../../services/drafts.service';
import { LoginComponent } from '../login/login.component';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import {   Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Scenario } from './step1TS/scenario';
import { Complainces} from './step1TS/complainces';
import { Budget } from './step1TS/budget';
import { Size } from './step1TS/size';
import { Duration } from './step1TS/duration';
import { Role } from './step1TS/role';

@Component({
	selector: 'app-create-projects',
	templateUrl: './create-projects.component.html',
	styleUrls: ['./create-projects.component.css'],
	providers:[LoginService,DataService]
})
export class CreateProjectsComponent implements OnInit {
	public projectName : any;
	public description : any; 
	public email : any;
	public finalDocs :any;
	public drafts:any;
	public retDrafts:any;

	results : String[];
	resDocs : resdocs[];
	public selectedScenario : Scenario = new Scenario('Select A Scenario','');
	scenarios = [
	new Scenario('Select A Scenario',''),
	new Scenario('Scenario1','sc1'),
	new Scenario('Scenario2','sc2'), 
	new Scenario('Scenario3','sc3'),
	new Scenario('Scenario4','sc4'),
	new Scenario('Scenario5','sc5'),
	new Scenario('Scenario6','sc6')
	]
	public selectedComplainces : Complainces = new Complainces('Type Of Complainces','');
	complainces = [
	new Complainces('Type Of Complainces',''),
	new Complainces('Complainces1','c1'),
	new Complainces('Complainces2','c2'), 
	new Complainces('Complainces3','c3'),
	new Complainces('Complainces4','c4'),
	new Complainces('Complainces5','c5'),
	new Complainces('Complainces6','c6')
	]
	public selectedBudget : Budget = new Budget('Select A Budget','');
	budgets = [
	new Budget('Select A Budget',''),
	new Budget('Budget1','b1'),
	new Budget('Budget2','b2'), 
	new Budget('Budget3','b3'),
	new Budget('Budget4','b4'),
	new Budget('Budget5','b5'),
	new Budget('Budget6','b6')
	]
	public selectedSize : Size = new Size('Size Of Project','');
	sizes = [
	new Size('Size Of Project',''),
	new Size('Size1','s1'),
	new Size('Size2','s2'), 
	new Size('Size3','s3'),
	new Size('Size4','s4'),
	new Size('Size5','s5'),
	new Size('Size6','s6')
	]
	public selectedDuration : Duration = new Duration('Duration Of Project','');
	durations = [
	new Duration('Duration Of Project',''),
	new Duration('Duration1','d1'),
	new Duration('Duration2','d2'), 
	new Duration('Duration3','d3'),
	new Duration('Duration4','d4'),
	new Duration('Duration5','d5'),
	new Duration('Duration6','d6')
	]
	public selectedRole : Role = new Role('Type Of Role','');
	roles = [
	new Role('Type Of Role',''),
	new Role('Role1','r1'),
	new Role('Role2','r2'), 
	new Role('Role3','r3'),
	new Role('Role4','r4'),
	new Role('Role5','r5'),
	new Role('Role6','r6')
	]


	constructor(private dataService: DataService,private router:Router,private http : Http,private loginService:LoginService,
		private commonService:CommonService,private draftsService:DraftsService  ) { 
		
	}

	ngOnInit() {
		// this.commonService.previousEmail.subscribe(email=>{
			// 	this.email = email;
			// 	console.log(email);
			// })
		}
		public step1Div = true;
		public step2Div = false;
		public step3Div = false;
		public ErrorAlert = '';
		public ID:any;
		public data;
		getDocs(){
			var step1Data = {"Scenario":this.selectedScenario.value,"Complainces":this.selectedComplainces.value,
			"Size":this.selectedSize.value,"Role":this.selectedRole.value,"Budget":this.selectedBudget.value,
			"Duration":this.selectedDuration.value};
			console.log(step1Data);

			let myHeaders = new Headers();
			myHeaders.set('Content-Type', 'application/json');
			// myHeaders.append('Access-Control-Allow-Origin','*');   
			let myParams = new URLSearchParams();
			myParams.set('Scenario' , this.selectedScenario.value);
			myParams.set('Complainces' , this.selectedComplainces.value);
			myParams.set('Duration'  , this.selectedDuration.value);
			myParams.set('Budget' , this.selectedBudget.value);
			myParams.set('Role', this.selectedRole.value);
			myParams.set('Size',this.selectedSize.value);		
			console.log(this.selectedSize.value );
			let options = new RequestOptions({ headers: myHeaders, params: myParams });
			return this.http.get('http://192.168.0.8:7003/soa-infra/resources/default/SELECT_DOCs1_L!1.2/RestService/',options)
			.map(res => res.json());
		}
		Step1(){ 
			if(this.selectedScenario.value === ''){
				this.ErrorAlert = "Please Select Anyone From Scenarios"; 
			}else if (this.selectedComplainces.value === '') {

				this.ErrorAlert = "Please Select Anyone From Complainces";

			}else if (this.selectedBudget.value === '') {

				this.ErrorAlert = "Please Select Anyone From Budget";
			}else if (this.selectedSize.value === '') {

				this.ErrorAlert = "Please Select Anyone From Size";

			}else if (this.selectedDuration.value === '') {

				this.ErrorAlert = "Please Select Anyone From Duration";

			}else if (this.selectedRole.value === '') {

				this.ErrorAlert = "Please Select Anyone From Role";

			}else{

				var step1Data = {"Scenario":this.selectedScenario.value,"Complainces":this.selectedComplainces.value,
				"Size":this.selectedSize.value,"Role":this.selectedRole.value,"Budget":this.selectedBudget.value,
				"Duration":this.selectedDuration.value,}; 

				this.getDocs().subscribe( (resDocs) =>{
					console.log(resDocs);
					this.resDocs = resDocs;
				}) 
				console.log(step1Data);

				this.step1Div = false;
				this.step2Div = true;
			}
		}
		Step2(){
			this.step1Div = false;
			this.step2Div = false;
			this.step3Div = true;
		}
		returnWizard1(){
			this.step1Div = true;
			this.step2Div = false;
			this.step3Div = false;
		}
		saveAsDrafts(){
			if(this.projectName === undefined){
				this.ErrorAlert = "Please Give A Project Name";
			}else if(this.description === undefined){
				this.ErrorAlert = "Please Add Some Description"; 
			}else{
				this.dataService.createDrafts( this.projectName,this.description,this.resDocs, this.email).subscribe(drafts=>{
					this.drafts = drafts;
					console.log(drafts.Drafts.projectId);
					this.ID = drafts.Drafts.projectId;
					if(this.ID =! ''){
						this.router.navigate(['myDrafts']);
					} 
				})
			}
		}
		returnWizard(){
			this.step3Div = false;
			this.step2Div = true;
			this.step1Div = false;
		}
		reset(){
			this.step3Div = false;
			this.step2Div = false;
			this.step1Div = true;
		}
		cancel(){
			this.router.navigate(['/myInbox']);
		}
		Step3(){ 
			if(this.projectName === undefined){
				this.ErrorAlert = "Please Give A Project Name";
			}else if(this.description === undefined){
				this.ErrorAlert = "Please Add Some Description"; 
			}else{
				this.dataService.getFinalDocs(this.projectName,this.description,this.resDocs, this.email).subscribe(finalDocs=>{
					this.finalDocs = finalDocs;
					console.log(finalDocs);
					if(this.finalDocs.project_id =! undefined){
						this.router.navigate(['/myInbox']);
					}else{
						this.ErrorAlert="It's a Bug From us try again";
					}
				})
			}
		}
	}


	interface resdocs{
		scenario :string,
		complainces :string,
		size : string,
		role : string,
		duration:string,
		budget:string
	}