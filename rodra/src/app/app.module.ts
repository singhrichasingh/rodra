import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { NgOtpInputModule } from  'ng-otp-input';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SplashComponent } from './pages/splash/splash.component';
import { LoginmpinComponent } from './pages/loginmpin/loginmpin.component';
import { LoginComponent } from './pages/login/login.component';
import { CreatempinComponent } from './pages/creatempin/creatempin.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './auth.service';
import { FaqComponent } from './pages/faq/faq.component';
import { FormsModule } from '@angular/forms';
import { PopmenuComponent } from './pages/popmenu/popmenu.component';
import { PersonalInfoComponent } from './pages/personal-info/personal-info.component';
import { ExternalLinkComponent } from './pages/external-link/external-link.component';
import { DownloadsComponent } from './pages/downloads/downloads.component';
import { WhatsnewComponent } from './pages/whatsnew/whatsnew.component';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { VideogalleryComponent } from './pages/videogallery/videogallery.component';
import { AboutComponent } from './pages/about/about.component';
import { HTTP } from '@ionic-native/http/ngx';
import { OtpComponent } from './pages/otp/otp.component';
import { PersonalMenuPopComponent } from './pages/personal-menu-pop/personal-menu-pop.component';
import { ChangePassComponent } from './pages/change-pass/change-pass.component';
import { BookAppointmentComponent } from './pages/book-appointment/book-appointment.component';
import { DatePicker } from '@ionic-native/date-picker/ngx';
import { RegisterComponent } from './pages/register/register.component';
import { StatusComponent } from './pages/status/status.component';
import { GrievancesComponent } from './pages/grievances/grievances.component';
import { OpenlpcComponent } from './pages/openlpc/openlpc.component';
import { ViewnemsComponent } from './pages/viewnems/viewnems.component';
import { DownloadsecondComponent } from './pages/downloadsecond/downloadsecond.component';
import { UpdateaddressComponent } from './pages/updateaddress/updateaddress.component';
@NgModule({
  declarations: [AppComponent,SplashComponent,
    LoginmpinComponent,
    LoginComponent,
    CreatempinComponent,
    FaqComponent,
    PopmenuComponent,
    PersonalInfoComponent,
    ExternalLinkComponent,
  DownloadsComponent,
  WhatsnewComponent,
  VideogalleryComponent,
  AboutComponent,
  OtpComponent,
  PersonalMenuPopComponent,
  ChangePassComponent,
  BookAppointmentComponent,
  RegisterComponent,
  StatusComponent,
  GrievancesComponent,
  OpenlpcComponent,
  ViewnemsComponent,
  DownloadsecondComponent,
  UpdateaddressComponent
],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,NgOtpInputModule, HttpClientModule, FormsModule  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },AuthService,InAppBrowser,HTTP,DatePicker],
  bootstrap: [AppComponent],
})
export class AppModule {}
