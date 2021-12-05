import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-personal-menu-pop',
  templateUrl: './personal-menu-pop.component.html',
  styleUrls: ['./personal-menu-pop.component.scss'],
})
export class PersonalMenuPopComponent implements OnInit {

  constructor(private router:Router,private popover:PopoverController) { }

  ngOnInit() {}
 async goToMenu(i){
    if(i==1){

    }
   else if(i==2){
    this.router.navigate(['/changePass'])
    await this.popover.dismiss();
    }
   else if(i==6){
    this.router.navigate(['/book'])
    await this.popover.dismiss();
    }
  }
}
