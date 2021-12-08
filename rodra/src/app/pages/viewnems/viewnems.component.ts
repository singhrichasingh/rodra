import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { PersonalMenuPopComponent } from '../personal-menu-pop/personal-menu-pop.component';

@Component({
  selector: 'app-viewnems',
  templateUrl: './viewnems.component.html',
  styleUrls: ['./viewnems.component.scss'],
})
export class ViewnemsComponent implements OnInit {

  data;
  constructor(private router:Router,private route: ActivatedRoute,private popoverController:PopoverController) {
    this.route.queryParams.subscribe(params => {
      if (params && params.userDetail) {
        this.data =(params.userDetail);
      }
    });
   }

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
  name=[
    {
    name:'Army',
    amount:'2522355',
    paid:'35656',
    remark:'Good'
  },
  {
    name:'Army',
    amount:'2522355',
    paid:'35656',
    remark:'Good'
  },
  {
    name:'Army',
    amount:'2522355',
    paid:'35656',
    remark:'Good'
  },
  {
    name:'Army',
    amount:'2522355',
    paid:'35656',
    remark:'Good'
  },
   {
    name:'Army',
    amount:'2522355',
    paid:'35656',
    remark:'Good'
  },
  {
    name:'Army',
    amount:'2522355',
    paid:'35656',
    remark:'Good'
  },
  {
    name:'Army',
    amount:'2522355',
    paid:'35656',
    remark:'Good'
  },
  {
    name:'Army',
    amount:'2522355',
    paid:'35656',
    remark:'Good'
  },
  {
    name:'Army',
    amount:'2522355',
    paid:'35656',
    remark:'Good'
  },
  {
    name:'Army',
    amount:'2522355',
    paid:'35656',
    remark:'Good'
  },
  {
    name:'Army',
    amount:'2522355',
    paid:'35656',
    remark:'Good'
  },
  {
    name:'Army',
    amount:'2522355',
    paid:'35656',
    remark:'Good'
  },
  {
    name:'Army',
    amount:'2522355',
    paid:'35656',
    remark:'Good'
  },
  {
    name:'Army',
    amount:'2522355',
    paid:'35656',
    remark:'Good'
  },
  {
    name:'Army',
    amount:'2522355',
    paid:'35656',
    remark:'Good'
  },
  {
    name:'Army',
    amount:'2522355',
    paid:'35656',
    remark:'Good'
  },
  {
    name:'Army',
    amount:'2522355',
    paid:'35656',
    remark:'Good'
  },
  {
    name:'Army',
    amount:'2522355',
    paid:'35656',
    remark:'Good'
  },
  {
    name:'Army',
    amount:'2522355',
    paid:'35656',
    remark:'Good'
  },
  {
    name:'Army',
    amount:'2522355',
    paid:'35656',
    remark:'Good'
  },
  {
    name:'Army',
    amount:'2522355',
    paid:'35656',
    remark:'Good'
  },
]
}
