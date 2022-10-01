import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { AboutComponent } from './pages/about/about.component';
import { AskMeListComponent } from './pages/ask-me-list/ask-me-list.component';
import { BasiclpcComponent } from './pages/basiclpc/basiclpc.component';
import { BookAppointmentComponent } from './pages/book-appointment/book-appointment.component';
import { ChangeMpinComponent } from './pages/change-mpin/change-mpin.component';
import { ChangePassComponent } from './pages/change-pass/change-pass.component';
import { ContactusComponent } from './pages/contactus/contactus.component';
import { CreatempinComponent } from './pages/creatempin/creatempin.component';
import { DakStatusComponent } from './pages/dak-status/dak-status.component';
import { DownloadsComponent } from './pages/downloads/downloads.component';
import { DownloadsecondComponent } from './pages/downloadsecond/downloadsecond.component';
import { EditprofileComponent } from './pages/editprofile/editprofile.component';
import { ExternalLinkComponent } from './pages/external-link/external-link.component';
import { FaqComponent } from './pages/faq/faq.component';
import { FeedbackComponent } from './pages/feedback/feedback.component';
import { FeedbackListComponent } from './pages/feedback-list/feedback-list.component';
import { ForgotPassComponent } from './pages/forgot-pass/forgot-pass.component';
import { FutureVisitComponent } from './pages/future-visit/future-visit.component';
import { GrievancesComponent } from './pages/grievances/grievances.component';
import { LoginComponent } from './pages/login/login.component';
import { NgModule } from '@angular/core';
import { OpenlpcComponent } from './pages/openlpc/openlpc.component';
import { PersonalInfoComponent } from './pages/personal-info/personal-info.component';
import { PopmenuComponent } from './pages/popmenu/popmenu.component';
import { RegisterComponent } from './pages/register/register.component';
import { ScheduleListComponent } from './pages/schedule-list/schedule-list.component';
import { StatusComponent } from './pages/status/status.component';
import { UpdateaddressComponent } from './pages/updateaddress/updateaddress.component';
import { UpdatemailmobileComponent } from './pages/updatemailmobile/updatemailmobile.component';
import { UploaddataComponent } from './pages/uploaddata/uploaddata.component';
import { VideogalleryComponent } from './pages/videogallery/videogallery.component';
import { ViewnemsComponent } from './pages/viewnems/viewnems.component';
import { WhatsnewComponent } from './pages/whatsnew/whatsnew.component';
import { ForgotMpinComponent } from './pages/forgot-mpin/forgot-mpin.component';
import { CpcComponent } from './pages/cpc/cpc.component';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component:LoginComponent,
  },
  {
    path: 'creatempin',
    component:CreatempinComponent,
  },{
    path: 'faq',
    component:FaqComponent,
  },{
    path: 'popmenu',
    component: PopmenuComponent,
  },{
    path: 'personalInfo',
    component: PersonalInfoComponent,
  },
  {
    path: 'extlink',
    component: ExternalLinkComponent,
  },
  {
    path: 'download',
    component: DownloadsComponent,
  },{
    path: 'whatsnew',
    component: WhatsnewComponent,
  },{
    path: 'video',
    component: VideogalleryComponent,
  },{
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'changePass',
    component: ChangePassComponent,
  },{
    path: 'changemPin',
    component: ChangeMpinComponent,
  },
  {
    path: 'book',
    component: BookAppointmentComponent,
  },{
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'status',
    component: StatusComponent,
  },
  {
    path: 'feedList',
    component: FeedbackListComponent,
  },
  {
    path: 'contact',
    component: ContactusComponent,
  },
  {
    path: 'grievance',
    component: GrievancesComponent,
  },{
    path: 'dakStatus',
    component:  DakStatusComponent,
  },
  {
    path: 'openlpc',
    component: OpenlpcComponent,
  },{
    path: 'viewnems',
    component: ViewnemsComponent,
  },
  {
    path: 'downloadsecond',
    component: DownloadsecondComponent,
  },
  {
    path:'updateaddress',
    component: UpdateaddressComponent
  },
  {
    path:'feedback',
    component:  FeedbackComponent
  }
 ,{
  path:'scheduleList',
  component:   ScheduleListComponent

}
,{
  path:'forgotPass',
  component:   ForgotPassComponent

}
,
{
    path: 'faqList',
    component: AskMeListComponent,
  },
  {
    path: 'basiclpc',
    component: BasiclpcComponent
  },
  {
    path: 'updateMail',
    component:UpdatemailmobileComponent
  },
  {
    path: 'editProfile',
    component: EditprofileComponent
  },
  {
    path: 'uploadDoc',
    component: UploaddataComponent
  },{
    path: 'scheduleListFuture',
    component: FutureVisitComponent
  },
  {
    path: 'forgotMpin',
    component: ForgotMpinComponent
    
  },
  {
    path: 'sevencpc',
    component: CpcComponent
    
  }

  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
