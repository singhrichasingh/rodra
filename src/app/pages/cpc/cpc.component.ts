import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { AuthService } from 'src/app/auth.service';
import { PersonalMenuPopComponent } from '../personal-menu-pop/personal-menu-pop.component';

@Component({
  selector: 'app-cpc',
  templateUrl: './cpc.component.html',
  styleUrls: ['./cpc.component.scss'],
})
export class CpcComponent implements OnInit {

  constructor(//private loadingCtrl: LoadingController,
    private auth: AuthService,
     private router: Router, 
    private popoverController: PopoverController,
    //private formBuilder: FormBuilder,
   // private transfer: FileTransfer,
   // private file: File,
   // private filepath: FilePath,
   // private datePicker: DatePicker,
   // private filechooser: FileChooser
   ) { }

  ngOnInit() {}


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
