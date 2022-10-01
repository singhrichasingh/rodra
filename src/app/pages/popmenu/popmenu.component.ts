/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-var */
/* eslint-disable eqeqeq */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, PopoverController } from '@ionic/angular';
import { InAppBrowser,InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { File } from '@ionic-native/file/ngx';
import { FileTransfer,FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { mergeAnalyzedFiles } from '@angular/compiler';
import { DocumentViewer,DocumentViewerOptions } from '@ionic-native/document-viewer/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { Platform } from '@ionic/angular';
@Component({
  selector: 'app-popmenu',
  templateUrl: './popmenu.component.html',
  styleUrls: ['./popmenu.component.scss'],
})
export class PopmenuComponent implements OnInit {
  options: InAppBrowserOptions = {
    location : 'no',//Or 'no'
    //hidden : 'yes', //Or  'yes'
   // clearcache : 'yes',
   // clearsessioncache : 'yes',
   // zoom : 'no',//Android only ,shows browser zoom controls
   hardwareback : 'yes',
   hideurlbar:'yes',
   // mediaPlaybackRequiresUserAction : 'no',
   // shouldPauseOnSuspend : 'no', //Android only
    closebuttoncaption : 'Close', //iOS only
    closebuttoncolor:'#0000ff',
    footer:'yes',
   // disallowoverscroll : 'no', //iOS only
    toolbar : 'yes', //iOS only
   // enableViewportScale : 'no', //iOS only
   // allowInlineMediaPlayback : 'no',//iOS only
   // presentationstyle : 'pagesheet',//iOS only
   // fullscreen : 'yes',//Windows only
};
loading: any;
  constructor(private router: Router,private popover: PopoverController,private iab: InAppBrowser,
    private socialSharing: SocialSharing,private platform: Platform,private transfer: FileTransfer, private file: File,
    private document: DocumentViewer,private fileopener: FileOpener,private loadingCtrl: LoadingController) { }
    fileTransfer =  this.transfer.create();
  ngOnInit() {}
  async openPage(index){
     if(index==1){
      this.router.navigate(['/contact']);
      await this.popover.dismiss();
     }
   else  if(index==2){
    this.router.navigate(['/video']);
    await this.popover.dismiss();
      }
  else  if(index==3){
    // window.open(
    //   'https://rodra.gov.in/Download.aspx',
    //   "_self",
    //   "hardwareback : yes,hideurlbar:yes"
    // );
    //this.iab.create('https://rodra.gov.in/Download.aspx',"_blank");
    this.router.navigate(['/download']);
    await this.popover.dismiss();
    }
   else if(index==4){
    this.router.navigate(['/about']);
    await this.popover.dismiss();
    }
   else if(index==5){
    this.router.navigate(['/whatsnew']);
    await this.popover.dismiss();
    }
    else if(index==6){
      this.router.navigate(['/status']);
      await this.popover.dismiss();
    }
    else if(index==7){
        var options={
          message: 'Rodra Application',
          url:'https://drive.google.com/file/d/1wpqk0Hm2bpG5PuHTVn1RlK-li6V1ljrg/view?usp=sharing'
        };
        this.socialSharing.shareWithOptions(options);



      await this.popover.dismiss();
    }
    else if(index==8){
      await this.popover.dismiss();
      this.presentAlert();
      const options: DocumentViewerOptions={title:'rodra.pdf'};
      const downloadUrl="https://rodra.gov.in/Actionondemise%20Pensioner.pdf"
     // const downloadUrl = 'http://103.1.82.29:807/Downloads/Actionondemise%20Pensioner.pdf';
      this.fileTransfer.download(downloadUrl,this.file.dataDirectory + 'File.pdf').then((entry) => {
        console.log('download complete: ' + entry.toURL());
        const url=entry.toURL();
        if(this.platform.is('ios')){
        this.document.viewDocument(url,'application/pdf',options);
        this.loadingCtrl.dismiss();
        }
        else{
        this.fileopener.open(url,'application/pdf');
        this.loadingCtrl.dismiss();
        }
      }, (error) => {
        console.log('ghhhj');
        console.log(JSON.stringify(error));
      });

    }
    else{
      this.presentAlert();
      await this.popover.dismiss();
      const downloadUrl = 'http://103.1.82.29:807/Downloads/RODRA%20ANDROID%20APP%20USER%20MANUAL.pdf';
    // this.iab.create(downloadUrl,'_self')
       const options: DocumentViewerOptions={title:'rodra.pdf'};
 // const downloadUrl = "http://103.1.82.29:807/Downloads/RODRA%20ANDROID%20APP%20USER%20MANUAL%20(1).docx";
  this.fileTransfer.download(downloadUrl,this.file.dataDirectory + 'file.pdf').then((entry) => {
    console.log('download complete: ' + entry.toURL());
    const url=entry.toURL();
    if(this.platform.is('ios')){
    this.document.viewDocument(url,'application/pdf',options);
    this.loadingCtrl.dismiss();
    }
    else{
    this.fileopener.open(url,'application/pdf');
    this.loadingCtrl.dismiss();
    }
  }, (error) => {
    console.log('ghhhj');
    console.log(JSON.stringify(error));
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

}
