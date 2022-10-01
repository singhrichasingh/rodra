/* eslint-disable @typescript-eslint/type-annotation-spacing */
/* eslint-disable no-trailing-spaces */
/* eslint-disable quote-props */
/* eslint-disable @typescript-eslint/semi */
/* eslint-disable prefer-const */
/* eslint-disable no-var */
/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { DocumentViewer,DocumentViewerOptions } from '@ionic-native/document-viewer/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { FileTransfer,FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { Platform } from '@ionic/angular';
import { File } from '@ionic-native/file/ngx';
@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss'],
})
export class StatusComponent implements OnInit {
  username: any;
  username1: any;
  randomNumber: any;
  randomNumberEntered: any;

  constructor(private auth:AuthService,private platform: Platform, private file: File,
    private document: DocumentViewer,private fileopener: FileOpener,private transfer: FileTransfer) { }
   toShow=true;
   appxShow=true;
   fileTransfer =  this.transfer.create();
  ngOnInit() {
    //this.randomNumber=
    this.generateRandomNumber(1111,9999);}
  show(ev){
    let val=ev.target.value;
   if(val=="status"){
    this.toShow=true;
   }
   else{
    this.toShow=false;
   }
  }
  generateRandomNumber(min,max){
    var rand=min+Math.random()*(max-min);
        rand=Math.round(rand);
        this.randomNumber= rand.toString();
        if(this.randomNumberEntered != ''){
          this.randomNumberEntered = '';
        }
  }
  getUserName(val){
    if(val==1){
    this.username=this.username.toUpperCase()
    }
    else{
      this.username1=this.username1.toUpperCase()
    }
  }
  submit(){
    this.username= this.username.toUpperCase()
    if(this.validateUserID(this.username)){
    if(this.randomNumber !=this.randomNumberEntered){
     // this.randomNumberEntered="";
      //this.randomNumber=
      this.generateRandomNumber(1111,9999);
      alert("Enter Correct Captcha")
    }
    else{
      let body={
        "perno":this.username
    }
    this.auth.cpcStatus(body).subscribe(res=>
      {
        console.log(' epp status', res);
        
     if(res.Status==1){
       alert(res.Message)
       this.generateRandomNumber(1111,9999);
     }
     else{
    //  this.randomNumberEntered = ''
      this.generateRandomNumber(1111,9999);
     }
      })
    }
  }
  }
  exGratiaEppoStatus(){
    this.username1= this.username1.toUpperCase()
    if(this.validateUserID(this.username1)){
    let body={
      "PersonalNo":this.username1
      // "perno":this.username1
  }
    this.auth.exGratiaEppoStatus(body).subscribe(res=>
      {
       console.log("gggg");
        console.log(JSON.stringify(res));
     if(res.Status==1){
       alert(res.Message)
       this.appxShow=false
    }
    if(res.Status==0){
      alert(res.Message)
      this.appxShow=false
   }
      })
    }
    }

    openAppx(){
      const options: DocumentViewerOptions={title:'Exgratia.pdf'};
      const downloadUrl="https://rodra.gov.in/DOWNLOADS/IMP%20POLICIES/COMPILATION%20OF%20DATA%20FOR%20GRANT%20OF%20EX-GRATIA%20AWARD%20TO%20ECOS_SSCOs%20WHO%20PARTICIPATED%20IN%201965%20AND%201971%20WARS.PDF"

      this.appxShow=true;
     this.fileTransfer.download(downloadUrl,this.file.dataDirectory + 'File.pdf').then((entry) => {
       console.log('download complete: ' + entry.toURL());
       const url=entry.toURL();
       if(this.platform.is('ios')){
       this.document.viewDocument(url,'application/pdf',options);
       }
       else{
       this.fileopener.open(url,'application/pdf');
       }
     }, (error) => {
       console.log('ghhhj');
       console.log(JSON.stringify(error));
     });
    }


    validateUserID(username){
      let regex= "^[A-Z0-9]*$"
       if( username.match(regex))
       {
         return true;
       }
       else
       {
         alert("Space and Special Charcters not allowed");
         return false;
         
       }
     }
}
