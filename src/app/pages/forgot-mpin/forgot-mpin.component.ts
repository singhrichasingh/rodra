import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { PersonalMenuPopComponent } from '../personal-menu-pop/personal-menu-pop.component';

@Component({
  selector: 'app-forgot-mpin',
  templateUrl: './forgot-mpin.component.html',
  styleUrls: ['./forgot-mpin.component.scss'],
})
export class ForgotMpinComponent implements OnInit {

  constructor(private router: Router,private popoverController: PopoverController) { }

  ngOnInit() {}

  async showMenu(){
    const popover = await this.popoverController.create({
      component:PersonalMenuPopComponent,
      cssClass: 'popInfo',
      //event: ev,
      translucent: true
    });
    await popover.present();
  }
  logout(){
    alert("Successfully Sign Out")
      //localStorage.clear();
      this.router.navigate(['/home'])
  }
}
