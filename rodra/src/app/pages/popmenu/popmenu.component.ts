import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
@Component({
  selector: 'app-popmenu',
  templateUrl: './popmenu.component.html',
  styleUrls: ['./popmenu.component.scss'],
})
export class PopmenuComponent implements OnInit {

  constructor(private router:Router,private popover:PopoverController,private iab: InAppBrowser) { }

  ngOnInit() {}
  async openPage(index){
     if(index==1){
      this.router.navigate(['/contact'])
      await this.popover.dismiss();
     }
   else  if(index==2){
    this.router.navigate(['/video'])
    await this.popover.dismiss();
      }
  else  if(index==3){
    this.router.navigate(['/download'])
    await this.popover.dismiss();
    }
   else if(index==4){
    this.router.navigate(['/about'])
    await this.popover.dismiss();
    }
   else if(index==5){
    this.router.navigate(['/whatsnew'])
    await this.popover.dismiss();
    }
    else if(index==6){
      this.router.navigate(['/status'])
      await this.popover.dismiss();
    }
    else if(index==7){
      this.router.navigate([''])
      await this.popover.dismiss();
    }
    else{
      this.iab.create('https://rodra.gov.in/Actionondemise%20Pensioner.pdf',"_blank");
      await this.popover.dismiss();
    }
  }
}
