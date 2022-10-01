import { Component, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonRouterOutlet, ModalController, Platform } from '@ionic/angular';
import { Location } from '@angular/common';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
declare let navigator: any;
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  
 

  @ViewChild(IonRouterOutlet, { static: true }) routeroutlet: IonRouterOutlet;
  @ViewChildren(IonRouterOutlet) routerOutlets: QueryList<IonRouterOutlet>;
  lastTimeBackPress = 0;
  timePeriodToExit = 2000;
  navigate: any;
  constructor(public modalController: ModalController,
    private platform: Platform,
    private alertController: AlertController,
    private router: Router, private location: Location,
    private androidPermissions:AndroidPermissions
  ) {
    platform.ready().then(() => {
      this.backButtonEvent();
      this.askForPermission()
    });
   
  }

  async openAlert() {
    const alert = await this.alertController.create({
      header: 'Check Network Connection',
      message: 'You do not have Internet Connection',
      buttons: [{
        text: 'ok',
        handler: () => {
          navigator.app.exitApp();
        }
      }]
    });
    await alert.present();
  }
  backButtonEvent() {
    this.platform.backButton.subscribeWithPriority(0, () => {
      this.routerOutlets.forEach(async (outlet: IonRouterOutlet) => {
        if (this.router.url !== '/home') {
          // await this.router.navigate(['/']);
          await this.location.back();
        } else if (this.router.url === '/home') {
          if (new Date().getTime() - this.lastTimeBackPress >= this.timePeriodToExit) {
            this.lastTimeBackPress = new Date().getTime();
            this.presentAlertConfirm();
          } else {
            navigator.app.exitApp();
          }
        }
      });
    });
  }

  askForPermission(){
    // this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.CAMERA).then(
    //   result => console.log('Has permission?',result.hasPermission),
    //   err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.CAMERA)
    // );
    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.CAMERA).then(
      result => {
        if (result.hasPermission) {
        } else {
          this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.CAMERA])
        }
      },
      err => {
        console.log(err);
      }
    );
    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.READ_CONTACTS).then(
      result => {
        if (result.hasPermission) {
        } else {
          this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.READ_CONTACTS])
        }
      },
      err => {
        console.log(err);
      }
    );
    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.READ_SMS).then(
      result => {
        if (result.hasPermission) {
        } else {
          this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.READ_SMS])
        }
      },
      err => {
        console.log(err);
      }
    );
    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE).then(
      result => {
        if (result.hasPermission) {
        } else {
          this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE])
        }
      },
      err => {
        console.log(err);
      }
    );
    // this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.CAMERA, this.androidPermissions.PERMISSION.READ_CONTACTS,this.androidPermissions.PERMISSION.READ_SMS,this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE]);
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Rodra Confirmation',
      message: 'Are you sure you want to exit the Rodra App?',
      buttons: [{
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blah) => { }
      }, {
        text: 'Close App',
        handler: () => {
          // this.offlineStatus();
          navigator.app.exitApp();
        }
      }]
    });

    await alert.present();
  }
}
