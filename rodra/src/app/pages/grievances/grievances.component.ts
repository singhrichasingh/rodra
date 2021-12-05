import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { SplashComponent } from '../splash/splash.component';

@Component({
  selector: 'app-grievances',
  templateUrl: './grievances.component.html',
  styleUrls: ['./grievances.component.scss'],
})
export class GrievancesComponent implements OnInit {

  constructor(private popoverController:PopoverController) { }
   new=true;
  ngOnInit() {}
  segmentChanged(ev){
  let val=ev.target.value;
  if(val=="new"){
   this.new=true;
  }
  else if(val=="status"){
   this.new=false
  }
  }
 async trackCase(){
    const popover = await this.popoverController.create({
      component: SplashComponent,
      cssClass: 'popClass',
      //event: ev,
      translucent: true
    });
    await popover.present();
  }
}
