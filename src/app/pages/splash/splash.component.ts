import { Component, OnInit } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.scss'],
})
export class SplashComponent implements OnInit {
  trackListData: any;

  constructor(public modalController: ModalController,private auth:AuthService,private popoverController:PopoverController) {
    // setTimeout(() => {
    //   //this.popover.dismiss();
    //   this.modalController.dismiss();
     
    // }, 3000);
    this.trackListData=this.auth.dataOfTrackCaseWithId
    console.log(JSON.stringify(this.trackListData))
   }

  ngOnInit() {}
  dismiss(){
    this.popoverController.dismiss()
    //this.modalController.dismiss();
  }
}
