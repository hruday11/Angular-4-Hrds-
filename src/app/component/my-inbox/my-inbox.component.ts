import { Component, OnInit } from '@angular/core';
import { InboxService } from '../../services/inbox.service';
import { LoginService } from '../../services/login.service';
import { CommonService } from '../../services/common.service'; 
import { Pipe,PipeTransform } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';



// @Pipe({name: 'keys'})
// export class KeysPipe implements PipeTransform {
//   transform(value, args:string[]) : any {
//     let keys = [];
//     for (let key in value) {
//       keys.push({key: key, value: value[key]});
//     }
//     return keys;
//   }
// }

@Component({
  selector: 'app-my-inbox',
  templateUrl: './my-inbox.component.html',
  styleUrls: ['./my-inbox.component.css']
})
export class MyInboxComponent implements OnInit {
  documents : Document[];

  constructor(private localStorageService:LocalStorageService,private inboxService:InboxService,private commonService:CommonService,private loginService:LoginService) { }

  ngOnInit() {
    let email1=JSON.stringify(this.localStorageService.get('email'));
    console.log(JSON.parse(email1));
    let email = JSON.parse(email1); 
			console.log(email)
      this.loginService.loginGetRecords(email).subscribe(documents=>{
        console.log(documents);
        console.log(documents.Project[0].username);
        this.documents = documents;  
      })
    }
  }
  
interface Document{
  fs:string,
  urs:any,
  hld:any,
  scenario:any,
  complainces:any,
  role:any,
  size:any,
  budget:any,
  duration:any,
  ProjectDesc:any,
  ProjectId:any,
  ProjectName:any;
  username:any,
}
