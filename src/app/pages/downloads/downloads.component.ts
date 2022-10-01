/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/member-ordering */

import { Component, OnInit } from '@angular/core';
import { DocumentViewer, DocumentViewerOptions } from '@ionic-native/document-viewer/ngx';
import { Http, HttpOptions } from '@capacitor-community/http';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
import { LoadingController, ModalController, Platform, PopoverController } from '@ionic/angular';

import { AuthService } from 'src/app/auth.service';
import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { PdfviewerComponent } from '../pdfviewer/pdfviewer.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-downloads',
  templateUrl: './downloads.component.html',
  styleUrls: ['./downloads.component.scss'],
})
export class DownloadsComponent implements OnInit {

  downloads: Array<any> = [];
  term: string;
  fileTransfer = this.transfer.create();
  loading: any;
  constructor(private auth: AuthService,
    private popoverController: PopoverController,
    private router: Router, private platform: Platform,
    private transfer: FileTransfer, private file: File,
    private document: DocumentViewer, private fileopener: FileOpener,private loadingCtrl: LoadingController) {
  }

  ngOnInit() {
    this.getdownloadDoc();
  }

  getdownloadDoc() {
    this.auth.getdownloadDoc().subscribe(res => {
      console.log(res);
      this.downloads = res;
    }, err => {
      console.log(err);
    });
  }

  // open(link) {
  //   console.log(encodeURI(link));
  //   window.open(encodeURI(link), '_system');
  // }

  open(link) {
    const options: DocumentViewerOptions = { title: 'rodra.pdf' };
    const downloadUrl = link;
    console.log("jjjjj")
    this.presentAlert();
    this.fileTransfer.download(downloadUrl, this.file.dataDirectory + 'file.pdf').then((entry) => {
      console.log('download complete: ' + entry.toURL());
      const url = entry.toURL();
      if (this.platform.is('ios')) {
        this.document.viewDocument(url, 'application/pdf', options);
        this.loadingCtrl.dismiss();
      }
      else {
        this.fileopener.open(url, 'application/pdf');
        this.loadingCtrl.dismiss();
      }
    }, (error) => {
      console.log('ghhhj');
      console.log(JSON.stringify(error));
    });
  }

  async presentAlert() {
    this.loading = await this.loadingCtrl.create({
      duration: 4000,
      message: 'Please wait...'
    });
    this.loading.present();

  }
}
