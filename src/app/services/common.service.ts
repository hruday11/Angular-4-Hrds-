import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class CommonService {
	public previousEmail = new BehaviorSubject<any>('email');
	currentEmail = this.previousEmail.asObservable();
	public email;

	constructor() { }

	commonEmail(email:string){
		this.previousEmail.next(email);
		this.currentEmail.subscribe(email=>{
			this.email = email;
			console.log(email);
		})
	} 
	
}
