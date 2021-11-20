import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Network } from '@ionic-native/network/ngx';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { MainpageComponent } from './pages/mainpage/mainpage.component';
import { FaqComponent } from './pages/faq/faq.component';
import { BookappointmentComponent } from './pages/bookappointment/bookappointment.component';

@NgModule({
  declarations: [
     AppComponent,
     LoginComponent,
     RegisterComponent,
     MainpageComponent,
     FaqComponent,
     BookappointmentComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [
            StatusBar,
            SplashScreen,
            Network,
    { 
      provide: RouteReuseStrategy, 
      useClass: IonicRouteStrategy 
    }],
  bootstrap: [AppComponent],
})
export class AppModule {}
