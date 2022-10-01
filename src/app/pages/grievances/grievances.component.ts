/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable guard-for-in */
/* eslint-disable eqeqeq */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatePicker } from '@ionic-native/date-picker/ngx';
import { File } from '@ionic-native/file/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { LoadingController, PopoverController } from '@ionic/angular';
import { AuthService } from 'src/app/auth.service';
import { PersonalMenuPopComponent } from '../personal-menu-pop/personal-menu-pop.component';
import { SplashComponent } from '../splash/splash.component';

@Component({
  selector: 'app-grievances',
  templateUrl: './grievances.component.html',
  styleUrls: ['./grievances.component.scss'],
})
export class GrievancesComponent implements OnInit {
  grievanceList: any;
  date2: string;
  date1: string;
  date: string;
  today: string;
  griev: any;
  mobile:any;
  grievanceType: any;
  ref1: string;
  ref2: string;
  ref1date: string;
  ref2date: string;
  grievanceStatusList: any;
  uploadText: string;
  fileTransfer: FileTransferObject;
  upload=false;
  uploadMsg;
  loading:any
  //formData: FormData;
  fileName: string;
  fileType: string;
  filePrefix: string;
  //file: any;
  formData= new FormData();
  fileData: string;
  uploadShow=false
  constructor(private loadingCtrl: LoadingController,
    private popoverController: PopoverController,private auth: AuthService,private datePicker: DatePicker,
    private router: Router,
    private transfer: FileTransfer,
    private file: File,
    private filepath: FilePath,
    private filechooser: FileChooser) {
      this.uploadText='';
     }
   new=true;
   persno;
   tDay = new Date();
  ngOnInit() {
    this.fileName='';
    this.ref1='';
    this.ref2='';
   this.ref1date='',
    this.ref2date='',
    this.persno=localStorage.getItem('personalNo');
   const date= new Date();
  this.today= date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate();
    this.getGrievanceList();
    this.getGrievanceStatus();
  }
  getUserName(){
    this.persno=this.persno.toUpperCase();
  }
  segmentChanged(ev){
  const val=ev.target.value;
  if(val=='new'){
   this.new=true;
  }
  else if(val=='status'){
   this.new=false;
  }
  }
  getGrievanceList(){
    this.auth.getGrievanceList().subscribe(res=>{
      this.grievanceList=res;

    });
  }
 async trackCase(caseId){
  const personalNo=localStorage.getItem('personalNo');


  const body= {
    Personal_no :personalNo,
    Case_Id : caseId
};
  this.auth.trackCaseWithId(body).subscribe(async res=>{
    this.auth.dataOfTrackCaseWithId=res;
    const popover = await this.popoverController.create({
      component: SplashComponent,
      cssClass: 'popClass',
      //event: ev,
      translucent: true
    });
     popover.present();
  });

  }
  grievType(ev){
    this.grievanceType=ev.target.value;
  }
  showDatepicker(val){
   if(val==2){
    this.datePicker.show({
      date: new Date(),
      mode: 'date',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK,
      okText:'Save Date',
      todayText:'Set Today'
    }).then(
      date => {
        const toCompare=new Date(date.getFullYear(), date.getMonth(), date.getDate());
        if(this.tDay>toCompare){
        this.ref1date=date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+'T08:00:00';
        this.date1 = date.getDate()+'-'+(date.getMonth()+1)+'-'+date.getFullYear();
        }
        else{
          alert('Reference1 date can\'t be greater than today date');
        }
      },
      err => console.log('Error occurred while getting date: ', err)
    );
  }
 else if(val==3){
    this.datePicker.show({
      date: new Date(),
      mode: 'date',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK,
      okText:'Save Date',
      todayText:'Set Today'
    }).then(
      date => {
        const toCompare=new Date(date.getFullYear(), date.getMonth(), date.getDate());
        if(this.tDay>toCompare){
        this.ref2date= date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+'T08:00:00';
        this.date2 = date.getDate()+'-'+(date.getMonth()+1)+'-'+date.getFullYear();
        }
        else{
          alert('Reference2 date can\'t be greater than today date');
        }
      },
      err => console.log('Error occurred while getting date: ', err)
    );
  }
}
mailText(value){
  let textVal=value.value
  if((textVal.indexOf('#') === -1) && (textVal.indexOf('*') === -1)){
    this.griev = textVal;
  }else{
    this.griev = '';
    alert('(* ,# ) these charc should not be allowed');
  }
}
refText(value){
  let textVal=value.value
  if((textVal.indexOf('#') === -1) && (textVal.indexOf('*') === -1)){
    this.ref1 = textVal;
  }else{
    this.ref1 = '';
    alert('(* ,# ) these charc should not be allowed');
  }
}
refText2(value){
  let textVal=value.value
  if((textVal.indexOf('#') === -1) && (textVal.indexOf('*') === -1)){
    this.ref2 = textVal;
  }else{
    this.ref2 = '';
    alert('(* ,# ) these charc should not be allowed');
  }
}
mobileNumber(value){
  let textVal=value.value
  if((textVal.indexOf('#') === -1) && (textVal.indexOf('*') === -1)){
    if(textVal.length<10){
      alert("Plaese enter 10 digit mobile no")
    }
    this.mobile = textVal;
  }else{
    this.mobile = '';
    alert('(* ,# ) these charc should not be allowed');
  }
}
submit(){
  this.persno= this.persno.toUpperCase();
  if(this.validation()){
    if(this.validateGriev()){
      if(this.validateMobileNo()){
  const body={
    pers_no: this.persno,
    complaint_details:this.griev,
    comp_subj_cd:this.grievanceType,
    complaint_dt:this.today+'T00:00:00',
    RL1:this.ref1,
    RL2:this.ref2,
    RL1_dt:this.ref1date,
    RL2_dt:this.ref2date,
    docu_upload_user1 : this.fileName,
    MobileNo : this.mobile
 };
console.log(JSON.stringify(body));
this.auth.newGrievance(body).subscribe(res=>{
  console.log('response grievances', body,res);


if(res.Status==1){
  alert('Successfully Created New Grievance With Id  '+res.Message);
  this.router.navigate(['/personalInfo']);
}
else{
  alert('Grievance Not Submitted');
 this.griev='';
 this.grievanceType=null;
 this.mobile=""
}
},err=>{

  console.log(err.error);
});
    }
}
}
}

validateMobileNo(){
  const regex = /[0-9]+/g;
    if (this.mobile.match(regex)) {
      if (this.mobile.length < 10) {
        alert('Enter 10 digit mobile no.');
        return false;
      }
      //alert("Enter Valid Mobile No!");
      return true;
    }
    else {
      alert('You have entered an invalid mobile no!');
      return false;
    }
}


validateGriev(){
  const regex= '^[a-zA-Z0-9]*$';
   if( this.persno.match(regex))
   {
     return true;
   }
   else
   {
     alert('Space and Special Charcters not allowed');
     return false;

   }
 }

validation(){
  if(this.griev==undefined||this.griev==''){
    alert('Please Enter Your Grievance');
  }

  else if(this.grievanceType==undefined||this.grievanceType==null){
    alert('Please Select Your Grievance Subject');
  }
  else if(this.mobile==undefined||this.mobile==''){
    alert('Please Enter Your Mobile No');
  }
  else{
  return true;
  }

}

getGrievanceStatus(){
  const personalNo=localStorage.getItem('personalNo');
  const body={
    pers_no :personalNo
};
    this.auth.getGrievanceStatus(body).subscribe(res=>{
      this.grievanceStatusList=res;
      console.log( this.grievanceStatusList);
    });
}
uploadDoc(ev){
 const type=ev.target.value;
 if(type=='yes'){
   this.upload=true;

 }
 else{
  this.upload=false;
  this.fileName='';
 }
}
selectFile(){
  //alert("ghgjh")
  this.filechooser.open().then((uri) => {
    this.filepath.resolveNativePath(uri).then((nativepath) => {

      this.fileName = nativepath.substring(nativepath.lastIndexOf('/') + 1);
      this.fileType = this.fileName.substring(this.fileName.lastIndexOf('.') + 1);
  if (this.fileType == 'pdf' || this.fileType  == 'jpg') {
        this.fileData = nativepath;
  }
      else {
        alert('Only pdf or jpg file can be selected');
        this.fileName = '';
      }
    }, err => {
      // alert(err)
    });
  });

    }
uploadFile(){
  this.presentAlert()
  this.auth.uploadDoc({filePath:this.fileData, name: this.fileName}).subscribe(res => {
    console.log('IMG UPLOAD', res);
    if (res.Status == 1) {
      this.loadingCtrl.dismiss();
      alert('File Uploaded Successfully');
      this.uploadMsg='File Uploaded Successfully'
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

async presentAlert() {
  this.loading = await this.loadingCtrl.create({
    duration: 4000,
    message: 'Please wait...'
  });
  this.loading.present();

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
  alert('Successfully Sign Out');
  //localStorage.clear();
  this.router.navigate(['/home']);
}
}
