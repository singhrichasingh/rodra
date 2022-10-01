import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';

import { AuthService } from 'src/app/auth.service';

import { OpenlpcComponent } from '../openlpc/openlpc.component';

@Component({
  selector: 'app-basiclpc',
  templateUrl: './basiclpc.component.html',
  styleUrls: ['./basiclpc.component.scss'],
})
export class BasiclpcComponent implements OnInit {
  body;
  constructor(private navCtrl: NavController,
    private modalCtrl: ModalController, private auth: AuthService) {
    //this.getLpcDetails();
    this.body = this.auth.lpcDetails;
  }

  ngOnInit() {}

  getLpcDetails() {
    const personalNo = localStorage.getItem('personalNo');
    const body = {
      perno: personalNo
    };
    this.auth.getLpcDetails(body).subscribe(res => {
      console.log(JSON.stringify(res));
      this.body = res[0];
    });
  }

  async openLpc() {
    const modal = await this.modalCtrl.create({
      component: OpenlpcComponent,
      componentProps: {
        editData: this.body
      }

    });
    return await modal.present();
  }

  async editBasic() {
    // const modal = await this.modalCtrl.create({
    //   component: EditlpcComponent,
    //   componentProps: {
    //     editData: this.body
    //   }

    // });
    // return await modal.present();
  }
}
