/* eslint-disable quote-props */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable no-trailing-spaces */
/* eslint-disable @typescript-eslint/semi */
/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/type-annotation-spacing */

import { Component, OnInit } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';

import { AuthService } from 'src/app/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-personal-menu-pop',
  templateUrl: './personal-menu-pop.component.html',
  styleUrls: ['./personal-menu-pop.component.scss'],
})
export class PersonalMenuPopComponent implements OnInit {
  mpinCheck: string;

  constructor(private router: Router, private popover: PopoverController, private modalCtrl: ModalController, private auth: AuthService) { }

  ngOnInit() { }

  async goToMenu(i) {
    if (i == 1) {
      this.router.navigate(['/editProfile'])
      await this.popover.dismiss();
    }
    else if (i == 2) {
      this.router.navigate(['/changePass'])
      await this.popover.dismiss();
    }
    else if (i == 12) {

      this.router.navigate(['/changemPin'])
      this.checkForMpin(2)
      await this.popover.dismiss();
    }
    else if (i == 3) {
      this.router.navigate(['/grievance'])
      await this.popover.dismiss();
    }
    else if (i == 4) {
      this.router.navigate(['/downloadsecond'])
      await this.popover.dismiss();
    }
    else if (i == 5) {
      //this.router.navigate(['/grievance'])
      await this.popover.dismiss();
    }
    else if (i == 6) {
      this.router.navigate(['/book'])
      await this.popover.dismiss();
    }
    else if (i == 7) {
      this.router.navigate(['/feedback'])
      await this.popover.dismiss();
    }
    else if (i == 8) {
      this.router.navigate(['/updateaddress'])
      await this.popover.dismiss();
    }
    else if (i == 9) {
      this.router.navigate(['/dakStatus'])
      await this.popover.dismiss();
    }
    else if (i == 10) {
      this.openlpc();

      await this.popover.dismiss();
    }
    else if (i == 11) {
      console.log('click here', localStorage.getItem('personalNo'));

      let personalNo = localStorage.getItem('personalNo')
      let body = {
        "Pin": personalNo
      }
      this.auth.viewnems(body).subscribe(async res => {
         if(typeof res[0]==="undefined"){
           alert("No NEMS Data Available")
        }
        else{
        this.auth.nemsInfo = res[0]
        console.log('response', this.auth.nemsInfo, res);

        this.router.navigate(['/viewnems'])
        }
        await this.popover.dismiss();

      })
    }
    else if (i == 13) {
      this.router.navigate(['/scheduleList'])
      await this.popover.dismiss();
    }
    else if (i == 14) {
      this.checkForMpin(1);
      // this.router.navigate(['/creatempin'])
      await this.popover.dismiss();
    }
  }

  checkForMpin(val){
    this.mpinCheck=localStorage.getItem('mpin')
    console.log("Mympin")
if(val==1){
    if(this.mpinCheck=="undefined"||this.mpinCheck==""||this.mpinCheck==null||this.mpinCheck==undefined||this.mpinCheck=="null"){
      this.router.navigate(['/creatempin'])
      }
  else{
      alert("Your MPIN is already created .If You want to change MPIN then goto Change MPIN page")
      this.router.navigate(['/changemPin'])
    }
  }
  if(val==2){
    if(this.mpinCheck=="undefined"||this.mpinCheck==""||this.mpinCheck==null||this.mpinCheck==undefined||this.mpinCheck=="null"){
      alert("Your don't have  MPIN. First Create MPIN")
      this.router.navigate(['/creatempin'])
      }
  else{
    this.router.navigate(['/changemPin'])
    }
  }
  }

  openlpc() {
      this.router.navigate(['/openlpc'])
  }
}
