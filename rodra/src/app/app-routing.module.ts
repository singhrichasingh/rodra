import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { BookAppointmentComponent } from './pages/book-appointment/book-appointment.component';
import { ChangePassComponent } from './pages/change-pass/change-pass.component';
import { ContactComponent } from './pages/contact/contact.component';
import { CreatempinComponent } from './pages/creatempin/creatempin.component';
import { DownloadsComponent } from './pages/downloads/downloads.component';
import { DownloadsecondComponent } from './pages/downloadsecond/downloadsecond.component';
import { ExternalLinkComponent } from './pages/external-link/external-link.component';
import { FaqComponent } from './pages/faq/faq.component';
import { GrievancesComponent } from './pages/grievances/grievances.component';
import { LoginComponent } from './pages/login/login.component';
import { LoginmpinComponent } from './pages/loginmpin/loginmpin.component';
import { OpenlpcComponent } from './pages/openlpc/openlpc.component';
import { OtpComponent } from './pages/otp/otp.component';
import { PersonalInfoComponent } from './pages/personal-info/personal-info.component';
import { PopmenuComponent } from './pages/popmenu/popmenu.component';
import { RegisterComponent } from './pages/register/register.component';
import { StatusComponent } from './pages/status/status.component';
import { UpdateaddressComponent } from './pages/updateaddress/updateaddress.component';
import { VideogalleryComponent } from './pages/videogallery/videogallery.component';
import { ViewnemsComponent } from './pages/viewnems/viewnems.component';
import { WhatsnewComponent } from './pages/whatsnew/whatsnew.component';

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
    path: 'mpinlogin',
    component:LoginmpinComponent,
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
  },{
    path: 'otp',
    component: OtpComponent,
  },
  {
    path: 'changePass',
    component: ChangePassComponent,
  },{
    path: 'book',
    component: BookAppointmentComponent,
  },{
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'status',
    component: StatusComponent,
  },{
    path: 'contact',
    component: ContactComponent,
  },{
    path: 'grievance',
    component: GrievancesComponent,
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
  }
 
  

  
 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
