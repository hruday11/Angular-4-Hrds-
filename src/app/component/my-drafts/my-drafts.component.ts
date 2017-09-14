import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';
import { DraftsService } from '../../services/drafts.service';

@Component({
  selector: 'app-my-drafts',
  templateUrl: './my-drafts.component.html',
  styleUrls: ['./my-drafts.component.css']
})
export class MyDraftsComponent implements OnInit {
 drafts : Drafts;

  constructor(private draftsService:DraftsService) { }

  ngOnInit() {
  	this.draftsService.getDrafts().subscribe(drafts=>{ 
        this.drafts = drafts;
        console.log(drafts.Drafts[0]);
    })
  }

}
interface Drafts{
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
