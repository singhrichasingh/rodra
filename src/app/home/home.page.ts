/* eslint-disable @typescript-eslint/member-ordering */

import { Component, OnInit } from '@angular/core';

import { AuthService } from '../auth.service';
import { PopmenuComponent } from '../pages/popmenu/popmenu.component';
import { PopoverController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  slideOpts = {
    initialSlide: 0,
    speed: 30,
    effect: 'fade',
    loop: true,
    //  autoplay: {
    //    delay: 5000,
    //    disableOnInteraction:false,
    //   //pauseOnMouseEnter:true
    // },
  };

  constructor(private popoverController: PopoverController, private router: Router, private auth: AuthService,) { }

  ngOnInit() {

    const body = {
      personalNo: localStorage.getItem('personalNo')
    };

    this.auth.getUserInfo(body).subscribe(res => {
      this.auth.userData = res[0];
    });
  }

  playVideo() {
    // this.slideOpts.autoplay.disableOnInteraction=true;
    //alert("khdlkjl")
    //this.slideOpts.autoplay=false
  }

  async openmenu() {
    const popover = await this.popoverController.create({
      component: PopmenuComponent,
      cssClass: 'popClass',
      //event: ev,
      translucent: true
    });
    await popover.present();

  }

  extrenal() {
    this.router.navigate(['/extlink']);
  }
  signup() {
    this.router.navigate(['/register']);
  }

}
