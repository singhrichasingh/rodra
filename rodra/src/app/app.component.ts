import { Component } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { SplashComponent } from './pages/splash/splash.component';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  
    navigate =
    [
      {
        title : "Home",
        url   : "/doctorlist",
        icon  : "people-outline"
      },
      {
        title : "Downloads",
        url   : "/doctorlist",
        icon  : "people-outline"
      },
      {
        title : "User Manual",
        url   : "/doctorlist",
        icon  : "people-outline"
      },
      {
        title : "FAQ",
        url   : "/dashboard",
        icon  : "podium-outline"
      },
      {
        title : "What's New",
        url   : "/dashboard",
        icon  : "call-outline"
      },
      {
        title : "External Links",
        url   : "/login",
        icon  : "call-outline"
      },
      {
        title : "More",
        url   : "/register",
        icon  : "call-outline"
      },
    ]


  constructor( public modalController: ModalController,private platform: Platform,) {
    platform.ready().then(() => {
 
      //statusBar.styleDefault();
      //this.moveToFirst();
    
     
  });
  }

  async moveToFirst(){
    //this.splashScreen.hide();
    const modal = await this.modalController.create({
     component: SplashComponent,
     showBackdrop:false,
    // cssClass:[{"width":"100vw"}]
   });
  // const pop=await this.popover.create({
  //   component: SplashComponent
  // })
  return await modal.present();
   //return await pop.present();
  }
}
