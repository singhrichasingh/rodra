import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { PopmenuComponent } from '../pages/popmenu/popmenu.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private popoverController:PopoverController,private router:Router) {}
  slideOpts = {
    initialSlide: 0,
    speed: 30,
    effect:"fade",
    loop:true,
  //  autoplay: {
  //    delay: 5000,
  //    disableOnInteraction:false,
  //   //pauseOnMouseEnter:true
  // },
     };
     playVideo(){
     // this.slideOpts.autoplay.disableOnInteraction=true;
       //alert("khdlkjl")
       //this.slideOpts.autoplay=false
     }

   async openmenu(){
      const popover = await this.popoverController.create({
        component: PopmenuComponent,
        cssClass: 'popClass',
        //event: ev,
        translucent: true
      });
      await popover.present();
  
     }

     extrenal(){
      this.router.navigate(['/extlink'])
     }
     signup(){
      this.router.navigate(['/register'])
     }


    
}
