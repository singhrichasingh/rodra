/* eslint-disable eqeqeq */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/naming-convention */

import { Component, OnInit } from '@angular/core';
import { FileTransfer, FileTransferObject, FileUploadOptions } from '@ionic-native/file-transfer/ngx';

import { AuthService } from 'src/app/auth.service';
import { File } from '@ionic-native/file/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { PersonalMenuPopComponent } from '../personal-menu-pop/personal-menu-pop.component';
import { LoadingController, PopoverController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { DatePicker } from '@ionic-native/date-picker/ngx';
@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.scss'],
})
export class EditprofileComponent implements OnInit {
  personalForm: FormGroup;
  data;
  uploadText: string;
  fileTransfer: FileTransferObject;
  persno: string;
  fileName = '';
  fileType: string;
  editppo=true;
  editspousePanNo=true;
  editspouseAadhar=true;
  editspouseDob=true;
  editspouseName=true;
  editdistrictDesc=true;
  editstateDesc=true;
  editpinCode=true;
  edittehsil=true;
  editpoliceStation=true;
  editpostOffice=true;
  editvillage=true;
  edithouseNo=true;
  editmohSt=true;
  editselfAltMobile=true;
  editselfAadhar=true;
  editdisabStatus=true;
  editdisabPercent=true;
  editgal=true;
  editselfPan=true;
  editcourseSerNo=true;
  editcommnType=true;
  editcorpsName=true;
  uploadShow=false
  fileData: string;
  states: any;
  selectedState: any;
  district: any;
  districtName;
  uploadMsg;
  stateName="stateName";
  toCompare: Date;
  today = new Date();
  spouseDob: string;
  entryType: any;
  armsServiceType: any;
  loading:any;
  constructor( private loadingCtrl: LoadingController,
    private auth: AuthService, private router: Router, private popoverController: PopoverController,
    private formBuilder: FormBuilder,
    private transfer: FileTransfer,
    private file: File,
    private filepath: FilePath,
    private datePicker: DatePicker,
    private filechooser: FileChooser) {
    this.data = this.auth.userData;
    this.uploadText = '';
  }

  ngOnInit() {
    this.initForm();
    this.enableDisable()
    this.getState();
    this.getEntryType();
    this.getArmsServiceType();
    this.changeDateformat();
   }
   getState(){
    this.auth.getState().subscribe(res=>{
     this.states=res;

    });
  }
  getDistrict(ev){
    let val= ev.target.value;
    this.selectedState=val
    this.auth.getDistrict(val).subscribe(res=>{
      this.district=res;
      console.log(JSON.stringify(this.district))
     }); 
  }
  getEntryType(){
    this.auth.getEntryType().subscribe(res=>{
      this.entryType=res;
 
     });

  }
  getArmsServiceType(){
    this.auth.getArmsServiceType().subscribe(res=>{
      this.armsServiceType=res;
 
     });

  }
  submit() {
    if(this.validateState()){
    const personalNo = localStorage.getItem('personalNo');
    if(this.editspouseDob==false){
      this.spouseDob=this.spouseDob.slice(0, 19)
    }
    const body = {
      perno: personalNo,
      House_no: this.personalForm.value.houseNo,
      Moh_st: this.personalForm.value.mohSt,
      Village: this.personalForm.value.village,
      Tehsil: this.personalForm.value.tehsil,
      Post_office: this.personalForm.value.postOffice,
      Telegraph_office: this.data.telegraphOffice,
      Police_stn: this.personalForm.value.policeStation,
      State_cd: this.personalForm.value.stateDesc,
      district_cd: this.personalForm.value.districtDesc,
      Pin_Code: this.personalForm.value.pinCode,

      ppo_no: this.personalForm.value.ppoNo,
      disab: this.personalForm.value.disabStatus,
      comp_dis_percent: this.personalForm.value.disabPercent,
      pan_no: this.personalForm.value.selfPan,
      aadhar_no: this.personalForm.value.selfAadhar,
      entry_type_cd:this.personalForm.value.commnType,
      course_no: this.personalForm.value.courseSerNo,
      mobile_no_self: this.data.selfMobile,
      alt_mobile_no: this.personalForm.value.selfAltMobile,
      Emil_id_slef: this.data.selfEmail,
      Corp_cd: this.personalForm.value.corpsName,
      penid: this.data.penId,
      Gal_Amt: this.personalForm.value.gal,
      nok_name: this.personalForm.value.spouseName,
      spouse_dob:  this.spouseDob,
      spouse_aadhar: this.personalForm.value.spouseAadhar,
      spouse_PAN: this.personalForm.value.spousePanNo
    };

    if (this.personalForm.invalid) {
      for (const key in this.personalForm.controls) {
        const controlErrors: ValidationErrors = this.personalForm.get(key).errors;
        if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
          });

          alert(key + ' has invaild value or empty');
          return;
        }
      };
      return;
    }


    console.log(JSON.stringify(body));
    this.auth.editProfile(body).subscribe(res => {
      console.log(JSON.stringify(res));
      if (res.Status == 1) {
        alert('Profile Updated');
        this.getData();
      }
    });
  }
  }

  validateState(){
    if(this.personalForm.value.stateDesc=="-Select-")
    {
      alert("Please select state")
    }
   else if(this.personalForm.value.districtDesc=="-Select-")
    {
      alert("Please select district")
    }
    else{
      return true;
  }
  }

  changeDateformat(){
    const spouseDob=this.data.spouseDob
    if(typeof spouseDob==='string'|| spouseDob!=null){
    this.spouseDob =  spouseDob.substring(6, 10) + '-' + spouseDob.substring(3, 5) + '-' + spouseDob.substring(0, 2)+ 'T00:00:00';
    }
  }
  updateEmailMobile() {
    this.router.navigate(['/updateMail']);

  }
  getData() {
    this.persno = localStorage.getItem('personalNo');
    const body = {
      personalNo: this.persno
    };
    this.auth.getUserInfo(body).subscribe(res => {
      this.auth.userData = res[0];
      this.router.navigate(['/personalInfo']);
      console.log(JSON.stringify(this.auth.userData));
    });
  }
//   showDatepicker(){
//   this.datePicker.show({
//     date: new Date(),
//     mode: 'date',
//     androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK,
//     okText: 'Save Date',
//     todayText: 'Set Today'
//   }).then(
//     date => {
//       this.toCompare = new Date(date.getFullYear(), date.getMonth(), date.getDate());
//       if (this.today > this.toCompare) {
//         alert(this.spouseDob)
//         this.spouseDob = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() ;
//       }
//       else {
//         alert('Invalid Date');
//       }
//     },
//     err => console.log('Error occurred while getting date: ', err)
//   );
// }
  selectFile(){
    this.filechooser.open().then((uri) => {
      this.filepath.resolveNativePath(uri).then((nativepath) => {

        this.fileName = nativepath.substring(nativepath.lastIndexOf('/') + 1);
        this.fileType = this.fileName.substring(this.fileName.lastIndexOf('.') + 1);

        if (this.fileType == 'pdf' || this.fileType  == 'jpg' ) {
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


  uploadFile() {
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
 
initForm(){
this.personalForm = this.formBuilder.group({
    ppoNo: [this.data.ppoNo],
    commnType: [this.data.commnType],
    courseSerNo: [this.data.courseSerNo],
    corpsName: [this.data.corpsName],
    selfPan: [this.data.selfPan ,[Validators.pattern('[A-Z]{5}[0-9]{4}[A-Z]{1}$'),Validators.maxLength(10)]],
    gal: [this.data.gal],
    disabStatus: [this.data.disabStatus],
    disabPercent: [this.data.disabPercent],
    selfAadhar: [this.data.selfAadhar,[Validators.pattern('^[2-9]{1}[0-9]{3}[0-9]{4}[0-9]{4}$'),Validators.maxLength(12)]],
    selfAltMobile: [this.data.selfAltMobile,[Validators.maxLength(10)]],
    houseNo: [this.data.houseNo, ],
    mohSt: [this.data.mohSt,[Validators.pattern('^[a-zA-Z0-9\-, ]*$'),]],
    village: [this.data.village,[Validators.pattern('^[a-zA-Z0-9\-, ]*$'),] ],
    postOffice: [this.data.postOffice, [Validators.pattern('^[a-zA-Z0-9\-, ]*$'),]],
    policeStation: [this.data.policeStation,[Validators.pattern('^[a-zA-Z0-9\-, ]*$'),] ],
    tehsil: [this.data.tehsil ,[Validators.pattern('^[a-zA-Z0-9\-, ]*$'),]],

    pinCode: [this.data.pinCode,[Validators.pattern('^[a-zA-Z0-9\-, ]*$'),Validators.maxLength(6)]],
    stateDesc: [this.data.stateDesc, [Validators.required]],
    districtDesc: [this.data.districtDesc, [Validators.required]],
    spouseName: [this.data.spouseName,[Validators.pattern('^[a-zA-Z_ ]*$'),Validators.required]],
    spouseDob: [this.spouseDob,[Validators.required]],
    spouseAadhar: [this.data.spouseAadhar,[Validators.pattern('^[2-9]{1}[0-9]{3}[0-9]{4}[0-9]{4}$'),Validators.maxLength(12)]],
    spousePanNo: [this.data.spousePanNo,[Validators.pattern('[A-Z]{5}[0-9]{4}[A-Z]{1}$'),Validators.maxLength(10)]],
  });
}




  enableDisable(){
      if(this.data.ppoNo==""||this.data.ppoNo==null){
        this.editppo=false
      }
      if(this.data.commnType==""||this.data.commnType=="-Select-"||this.data.commnType==null){
        this.editcommnType=false
      }
      if(this.data.courseSerNo==""||this.data.courseSerNo==null){
        this.editcourseSerNo=false
      }
      if(this.data.corpsName==""||this.data.corpsName==null||this.data.corpsName=="-Select-"){
        this.editcorpsName=false
      }
      if(this.data.selfPan==""||this.data.selfPan==null){
        this.editselfPan=false
      }
      if(this.data.gal==""||this.data.gal==null){
        this.editgal=false
      }
      if(this.data.disabStatus==""||this.data.disabStatus==null){
        this.editdisabStatus=false
      }
      if(this.data.disabPercent==""||this.data.disabPercent==null){
        this.editdisabPercent=false
      }
      if(this.data.selfAadhar==""||this.data.selfAadhar==null){
        this.editselfAadhar=false
      }
      if(this.data.selfAltMobile==""||this.data.selfAltMobile==null){
        this.editselfAltMobile=false
      }
      if(this.data.houseNo==""||this.data.houseNo==null){
        this.edithouseNo=false
      }
      if(this.data.mohSt==""||this.data.mohSt==null){
        this.editmohSt=false
      }
      if(this.data.village==""||this.data.village==null){
        this.editvillage=false
      }
      if(this.data.postOffice==""||this.data.postOffice==null){
        this.editpostOffice=false
      }
      if(this.data.policeStation==""||this.data.policeStation==null){
        this.editpoliceStation=false
      }
      if(this.data.tehsil==""||this.data.tehsil==null){
        this.edittehsil=false
      }
      if(this.data.pinCode==""||this.data.pinCode==null){
        this.editpinCode=false
      }
      if(this.data.stateDesc==""||this.data.stateDesc==null||this.data.stateDesc=="-Select-"){
        this.editstateDesc=false
      }
      if(this.data.districtDesc==""||this.data.districtDesc==null||this.data.districtDesc=="-Select-"){
        this.editdistrictDesc=false
      }
      if(this.data.spouseName==""||this.data.spouseName==null){
        this.editspouseName=false
      }
      if(this.data.spouseDob==""||this.data.spouseDob==null){
        this.editspouseDob=false
      }
      if(this.data.spouseAadhar==""||this.data.spouseAadhar==null){
        this.editspouseAadhar=false
      }
      if(this.data.spousePanNo==""||this.data.spousePanNo==null){
        this.editspousePanNo=false
      }
    
      
  }
  
}
