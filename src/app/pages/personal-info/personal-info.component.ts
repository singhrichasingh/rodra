import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/auth.service';
import { PersonalMenuPopComponent } from '../personal-menu-pop/personal-menu-pop.component';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss'],
})
export class PersonalInfoComponent implements OnInit {
  data;
  userNo;
  constructor(private router: Router, private route: ActivatedRoute,
    private popoverController: PopoverController, public auth: AuthService) {
    //this.userNo=this.auth.userProfile.PersonalNo
    this.data = this.auth.userData;
  }

  ngOnInit() {
    const body = {
      personalNo: localStorage.getItem('personalNo')
    };

    this.auth.getUserInfo(body).subscribe(res => {
      this.auth.userData = res[0];
    });
  }

  ionViewWillEnter() {
    this.data = this.auth.userData;
  }

  async showMenu() {
    const popover = await this.popoverController.create({
      component: PersonalMenuPopComponent,
      cssClass: 'popInfo',
      //event: ev,
      translucent: true
    });
    await popover.present();
  }
  logout() {
    alert('Successfully Sign Out');
    //localStorage.clear();
    this.router.navigate(['/home']);
  }
}
