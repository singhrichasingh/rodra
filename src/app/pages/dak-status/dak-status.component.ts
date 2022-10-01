import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { AuthService } from 'src/app/auth.service';
import { PersonalMenuPopComponent } from '../personal-menu-pop/personal-menu-pop.component';

@Component({
  selector: 'app-dak-status',
  templateUrl: './dak-status.component.html',
  styleUrls: ['./dak-status.component.scss'],
})
export class DakStatusComponent implements OnInit {
  dakStatus: any;
  length: any;

  constructor(private auth:AuthService,private router:Router,private popoverController:PopoverController) { }

  ngOnInit() {this.getdakStatus()}
  getdakStatus(){
    let personalNo=localStorage.getItem('personalNo')
    let body={
      "personalNo": personalNo
  }
    this.auth.getDakStatus(body).subscribe(res=>{
      this.dakStatus=res;
      this.length=this.dakStatus.length;
  //  console.log("fdbj"+'     '+res)
  //  console.log()
    })
  }

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
   // localStorage.clear();
    this.router.navigate(['/home'])
  }
}
