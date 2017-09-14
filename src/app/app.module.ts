import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule,JsonpModule } from '@angular/http';
import { RouterModule,Routes} from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { BrowserXhr } from  '@angular/http';

/** External Modules */
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import {CustExtBrowserXhr} from   './component/xhr' ;
import { LocalStorageModule } from 'angular-2-local-storage'; 

/** Components*/
import { AppComponent } from './app.component';
import { MyInboxComponent } from './component/my-inbox/my-inbox.component';
import { MyDraftsComponent } from './component/my-drafts/my-drafts.component';
import { MyProjectsComponent } from './component/my-projects/my-projects.component';
import { CreateProjectsComponent } from './component/create-projects/create-projects.component';
import { LoginComponent } from './component/login/login.component';
/** Serevices*/
import { DataService } from './services/data.service';
import { LoginService } from './services/login.service';
import { InboxService } from './services/inbox.service';
import { CommonService } from './services/common.service';
import { DraftsService } from './services/drafts.service';

/** Routes */
const appRoutes : Routes = [
    {path:'',component:LoginComponent},
    {path:'myInbox',component:MyInboxComponent},
    {path:'myDrafts',component:MyDraftsComponent},
    {path:'myProjects',component:MyProjectsComponent},
    {path:'createProjects',component:CreateProjectsComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    MyInboxComponent,
    MyDraftsComponent,
    MyProjectsComponent,
    CreateProjectsComponent,
    LoginComponent
  ],
  imports: [
  RouterTestingModule,
   LocalStorageModule.withConfig({
            prefix: 'my-app',
            storageType: 'localStorage'
        }),
    BrowserModule,
    JsonpModule,
    FormsModule,
    HttpModule,
    RouterModule,
    BsDropdownModule.forRoot(),
    TypeaheadModule.forRoot(),
    RouterModule.forRoot(appRoutes) 
  ],
  providers: [DataService,LoginService,BrowserXhr,DraftsService, CustExtBrowserXhr,InboxService,CommonService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
