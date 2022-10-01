import { Component, OnInit } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
//import { FileTransfer, FileUploadOptions, FileTransferObject } from '@awesome-cordova-plugins/file-transfer/ngx';
//import { File } from '@awesome-cordova-plugins/file';
import { File } from '@ionic-native/file/ngx';
import { FileTransfer,FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { mergeAnalyzedFiles } from '@angular/compiler';
import { DocumentViewer,DocumentViewerOptions } from '@ionic-native/document-viewer/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { Platform } from '@ionic/angular';
import { AuthService } from 'src/app/auth.service';
@Component({
  selector: 'app-whatsnew',
  templateUrl: './whatsnew.component.html',
  styleUrls: ['./whatsnew.component.scss'],
})
export class WhatsnewComponent implements OnInit {
  term: string;
  content:string
  whatsNew: Array<any>
  //  =[
  //   {Title:"To Check SPARSH Migration status, kindly login and click on Various function -> DAK/SPARSH status",link:""},
  //   {Title:"Docus Reqd to be submit when Veteran/NOK changes their PDA",link:"http://103.1.82.29:807/Downloads/WhatsNew/Circular-206.pdf"},
  //   {Title:"Kind attention of all Veteran Offrs and  their NOKs",link:"http://103.1.82.29:807/Downloads/WhatsNew/message%20to%20veterans.pdf"},
  //   {Title:"PCDA-Pension-Circular-218",link:"http://103.1.82.29:807/Downloads/WhatsNew/PCDA-Pension-Circular-218.pdf"},
  //   {Title:"HOW TO DOWNLOAD ePPO FROM DIGILOCKER",link:"http://103.1.82.29:807/Downloads/WhatsNew/how%20to%20download%20ePPO.pdf"},
  //   {Title:"Advisory to spouse on demise of pensioner",link:"http://103.1.82.29:807/Downloads/WhatsNew/ADVISORY%20TO%20SPOUSE%20ON%20DEMISE%20OF%20PENSIONER.pdf"},
  //   {Title:"Video on 7th CPC documents upload process is available in video gallery.",link:""},
  //   {Title:"Important informationn regarding smooth payment of Pension by Banks/PDAs. PCDA(P) circular No 213 and GOI Orders dt 15 May 20",link:"http://103.1.82.29:807/Downloads/WhatsNew/Circular-213.pdf"},
  //   {Title:"Action by spouse on Demise of a Pensioner",link:"http://103.1.82.29:807/Downloads/WhatsNew/Actionondemise%20Pensioner.pdf"}
  // ]
  constructor(private platform:Platform,private iab: InAppBrowser,private transfer: FileTransfer, private file: File,private document:DocumentViewer,private fileopener:FileOpener,public auth:AuthService) { }
  downloadText:any;
  fileTransfer =  this.transfer.create();
  slideOpts = {
    initialSlide: 0,
    speed: 30,
    slidesPerView:3,
    effect:"fade",
    loop:true,
    direction:"vertical",
   autoplay: {
     delay: 3000,
    //pauseOnMouseEnter:true
  },
     };
  ngOnInit() {
    this.getWhatsNew()
  }

  public highlight() {
    if(!this.term) {
      for(let i=0;i<this.whatsNew.length;i++){
        return  this.whatsNew[i];
      }
        
    }
    for(let i=0;i<this.whatsNew.length;i++){
    return this.whatsNew[i].replace(new RegExp(this.term, "gi"), match => {
        return '<span class="highlightText">' + match + '</span>';
    });
  }
}


  getWhatsNew(){
    this.auth.getWhatsNew().subscribe(res=>{
      //this.mp5oro=res;
      this.whatsNew=res;
    })
  }
  openInBrowser(name,link){
    // window.open(
    //   link,
    //   "_self",
    //   "popup=yes"
    // );
    let url=link
  
    const options:DocumentViewerOptions={title:"rodra.pdf"}
    const downloadUrl = link;
    this.fileTransfer.download(downloadUrl,this.file.dataDirectory + 'File.pdf').then((entry) => {
      console.log('download complete: ' + entry.toURL());
      let url=entry.toURL()
      if(this.platform.is('ios')){
      this.document.viewDocument(url,'application/pdf',options)
      }
      else{
      this.fileopener.open(url,'application/pdf')
      }
    }, (error) => {
      console.log("ghhhj")
      console.log(JSON.stringify(error))
    });
    
    //this.iab.create(link);
  }



}
