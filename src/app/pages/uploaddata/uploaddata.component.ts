/* eslint-disable guard-for-in */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable eqeqeq */

import { Component, OnInit } from '@angular/core';
import { FileTransfer, FileTransferObject, FileUploadOptions } from '@ionic-native/file-transfer/ngx';
import { LoadingController, ModalController, PopoverController } from '@ionic/angular';

import { AuthService } from 'src/app/auth.service';
import { File } from '@ionic-native/file/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { LpcinvoiceComponent } from '../lpcinvoice/lpcinvoice.component';
import { PersonalMenuPopComponent } from '../personal-menu-pop/personal-menu-pop.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-uploaddata',
  templateUrl: './uploaddata.component.html',
  styleUrls: ['./uploaddata.component.scss'],
})
export class UploaddataComponent implements OnInit {
  uploadText: any;
  downloadText: any;
  fileTransfer: FileTransferObject;
  fileName: string;
  loading:any
  fileType: string;
  filePrefix: string;
  fileData: any;
  fileData1: string;
  fileType1: string;
  fileName1: string;
  filePrefix1: string;

  uploadShow=false
  uploadShow1=false
  uploadMsg1;
  uploadMsg2;
  constructor(private loadingCtrl: LoadingController,
    private modalCtrl: ModalController, private router: Router,
    private transfer: FileTransfer,
    private file: File,
    private filepath: FilePath,
    private filechooser: FileChooser,
    private popoverController: PopoverController, private auth: AuthService) {
    this.uploadText = '';
    this.downloadText = '';
  }

  ngOnInit() { }

  selectFile(value) {
    // this.file = event.target.files[0]
    this.filechooser.open().then((uri) => {
    this.filepath.resolveNativePath(uri).then((nativepath) => {
       if(value==1){
        this.fileName = nativepath.substring(nativepath.lastIndexOf('/') + 1);
        this.fileType = this.fileName.substring(this.fileName.lastIndexOf('.') + 1);
        this.filePrefix = this.fileName.substring(0, this.fileName.lastIndexOf('.'));
        // console.log(this.fileName, this.fileType, this.filePrefix);
        if (this.fileType == 'pdf' || this.fileType  == 'jpg') {
          this.fileData = nativepath;
        }
        else {
          alert('Only pdf or jpg file can be selected');
          this.fileName = '';
        }
       }
       else{
        this.fileName1 = nativepath.substring(nativepath.lastIndexOf('/') + 1);
        this.fileType1 = this.fileName.substring(this.fileName.lastIndexOf('.') + 1);
        this.filePrefix1 = this.fileName.substring(0, this.fileName.lastIndexOf('.'));
        // console.log(this.fileName, this.fileType, this.filePrefix);
        if (this.fileType1 == 'pdf' || this.fileType1  == 'jpg') {
          this.fileData1 = nativepath;
        }
        else {
          alert('Only pdf or jpg file can be selected');
          this.fileName1 = '';
        }
       }
  err => {
        // alert(err)
      }
 }
      )
})
  }
  

  uploadFile(value) {
    if(value==1){
      this.presentAlert()
    this.auth.uploadDoc({filePath: this.fileData, name: this.fileName}).subscribe(res => {
      console.log('IMG UPLOAD', res);
      if (res.Status == 1) {
        this.loadingCtrl.dismiss();
        alert('LPC File Uploaded Successfully');
        this.uploadMsg1='File Uploaded Successfully'
        this.uploadShow=true
      }
      else {
        alert(res.Message);
      }
    },
      err => {
        alert(JSON.stringify(err));
      });
    }
    else{
      this.presentAlert()
      this.auth.uploadDoc({filePath: this.fileData1, name: this.fileName1}).subscribe(res => {
        console.log('IMG UPLOAD', res);
        if (res.Status == 1) {
          this.loadingCtrl.dismiss();
          alert('Misc. File Uploaded Successfully');
          this.uploadMsg2='Misc. File Uploaded Successfully'
          this.uploadShow1=true
        }
        else {
          alert(res.Message);
        }
      },
        err => {
          alert(JSON.stringify(err));
        });
      }
  }

  async presentAlert() {
    this.loading = await this.loadingCtrl.create({
      duration: 4000,
      message: 'Please wait...'
    });
    this.loading.present();
  
  }

  async invoiceOpen() {
    const personalNo = localStorage.getItem('personalNo');
    const body = {
      perno: personalNo
    };
    this.auth.getLpcDetails(body).subscribe(async (res: any) => {
      console.log(res);

      const modal = await this.modalCtrl.create({
        component: LpcinvoiceComponent,
        componentProps: {
          editData: res[0]
        }
      });
      return await modal.present();
    });
  }



  downloadFile() {
    this.downloadText = 'downloading...';
    this.fileTransfer.download('file url', this.file.externalRootDirectory + 'rodra.pdf').then((data) => {
      alert('completed..');
      this.downloadText = '';
    }, err => {
      this.downloadText = '';
      alert('file downloading failed..');
    });
  }

  // dismiss() {
  //   this.modalCtrl.dismiss();
  //   this.router.navigate(['/openlpc'])
  // }

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

  gotoLPC() {
    this.router.navigate(['/openlpc']);
  }
}
