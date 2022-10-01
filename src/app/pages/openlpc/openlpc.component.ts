/* eslint-disable no-trailing-spaces */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/semi */
/* eslint-disable guard-for-in */
/* eslint-disable eqeqeq */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/naming-convention */

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';

import { ActionSheetController, PopoverController } from '@ionic/angular';
import { AuthService } from 'src/app/auth.service';
import { DatePicker } from '@ionic-native/date-picker/ngx';
import { FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { Router } from '@angular/router';
import { PersonalMenuPopComponent } from '../personal-menu-pop/personal-menu-pop.component';

@Component({
  selector: 'app-openlpc',
  templateUrl: './openlpc.component.html',
  styleUrls: ['./openlpc.component.scss'],
})
export class OpenlpcComponent implements OnInit {

  relationsTypes = [];
  familyPensionerTypes = [];
   disable=true
  uploadText: any;
  downloadText: any;
  fileTransfer: FileTransferObject;
  spouse_aadhar; spouse_dob;
  spousetype; spouse_PAN;
  toCompare: Date;
  today = new Date();
  fileName: string;
  fileType: string;

  contactForm: FormGroup;
  spouseDob: string;
  depnDob: string;
  rankCode;

  constructor(
    private router: Router, private datePicker: DatePicker,
    public actionSheetController: ActionSheetController, public auth: AuthService, private formBuilder: FormBuilder,private popoverController:PopoverController)
  {
    this.uploadText = '';
    this.downloadText = '';
  }


  ngOnInit() {
    this.getLpcDetails();
  }

  getLpcDetails() {
    const personalNo = localStorage.getItem('personalNo')
    const body = { perno: personalNo };
    console.log(body);
    this.auth.getLpcDetails(body).subscribe(res => {
      this.auth.lpcDetails = res[0];
      console.log(JSON.stringify(res[0]))
      this.changeDateformatandRankCode();
      this.getRelations();
      this.getFamilyPensionerType();
      this.initForm();
    }, err => {
      console.log(err);
    });
  }

  getRelations() {
    this.auth.getRelationsType().subscribe(res => {
      this.relationsTypes = res;
    });
  }

  getFamilyPensionerType() {
    this.auth.getFamilyPensionerType().subscribe(res => {
      this.familyPensionerTypes = res;
    });
  }

  changeDateformatandRankCode(){
    const spouseDob=this.auth.lpcDetails.NOK_DOB
    if(typeof spouseDob==='string'){
    this.spouseDob = spouseDob.substring(6, 10) + '-' + spouseDob.substring(3, 5) + '-' + spouseDob.substring(0, 2);
    }
    const depnDob=this.auth.lpcDetails.Depn_DOB
    if(typeof depnDob==='string'){
    this.depnDob =  depnDob.substring(6, 10) + '-' + depnDob.substring(3, 5) + '-' + depnDob.substring(0, 2);
    }
    this.getRankCode();
  }

  getRankCode(){
   this.auth.getRankCode().subscribe(res=>{
     if(res[0].rank_desc=='2ND LT'){
      this.rankCode= '010';
     }
     else if(res[0].rank_desc=='BRIG'){
      this.rankCode= '8';
     }
     else if(res[0].rank_desc=='CADET'){
      this.rankCode= '1';
    }
    else if(res[0].rank_desc=='CAPT'){
      this.rankCode= '3';
    }
    else if(res[0].rank_desc=='COL'){
      this.rankCode= '7';
    }
    else if(res[0].rank_desc=='COL(TS)'){
      this.rankCode= '15';
    }
    else if(res[0].rank_desc=='FD MARSHAL'){
      this.rankCode= '150';
    }
    else if(res[0].rank_desc=='GEN'){
      this.rankCode= '14';
    }
    else if(res[0].rank_desc=='LT'){
      this.rankCode= '2';
    }
    else if(res[0].rank_desc=='LT COL'){
      this.rankCode= '6';
    }
    else if(res[0].rank_desc=='LT COL(TS)'){
      this.rankCode= '5';
    }
    else if(res[0].rank_desc=='LT GEN'){
      this.rankCode= '10';
    }
    else if(res[0].rank_desc=='LT GEN CMDR'){
      this.rankCode= '11';
    }
    else if(res[0].rank_desc=='LT GEN VCOAS'){
      this.rankCode= '13';
    }
    else if(res[0].rank_desc=='LT. GEN(DGAFMS)'){
      this.rankCode= '12';
    }
    else if(res[0].rank_desc=='MAJ'){
      this.rankCode= '4';
    }
    else if(res[0].rank_desc=='MAJ GEN'){
      this.rankCode= '9';
    }
   });
  }

  initForm() {
    console.log(this.auth.lpcDetails);
    this.contactForm = this.formBuilder.group({
      personal_no: [this.auth.lpcDetails.personal_no],
      rank_desc: [this.auth.lpcDetails.rank_desc],
      name: [this.auth.lpcDetails.name],
      Retire_dt: [this.auth.lpcDetails.Retire_dt],
      PPO_No: [this.auth.lpcDetails.PPO_No],
      corr_ppo: [this.auth.lpcDetails.corr_ppo],
      Self_DOB: [this.auth.lpcDetails.Self_DOB],
      Self_Aadhar: [this.auth.lpcDetails.Self_Aadhar],
      self_PAN: [this.auth.lpcDetails.self_PAN],
      Self_Email: [this.auth.lpcDetails.Self_Email],
      Self_Mobile: [this.auth.lpcDetails.Self_Mobile],
      NOK_Name: [this.auth.lpcDetails.NOK_Name, [Validators.pattern('^[a-zA-Z_ ]*$')]],
      NOK_DOB: [this.spouseDob,[Validators.required]],
      NOK_Aadhar: [this.auth.lpcDetails.NOK_Aadhar, [Validators.pattern('^[2-9]{1}[0-9]{3}[0-9]{4}[0-9]{4}$'),Validators.maxLength(12)]],
      NOK_PAN: [this.auth.lpcDetails.NOK_PAN, [Validators.pattern('[A-Z]{5}[0-9]{4}[A-Z]{1}$')]],
      NOK_Email: [this.auth.lpcDetails.NOK_Email, [Validators.pattern('^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$')]],
      NOK_Mobile: [this.auth.lpcDetails.NOK_Mobile],

      Depn_Name: [this.auth.lpcDetails.Depn_Name, [Validators.pattern('^[a-zA-Z_ ]*$'),Validators.required]],
      Depn_DOB: [this.depnDob, [Validators.required]],
      Depn_Aadhar: [this.auth.lpcDetails.Depn_Aadhar,[Validators.pattern('^[2-9]{1}[0-9]{3}[0-9]{4}[0-9]{4}$'),Validators.maxLength(12)]],
      Depn_Mobile: [this.auth.lpcDetails.Depn_Mobile],
      Depn_Email: [this.auth.lpcDetails.Depn_Email, [Validators.pattern('^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$')]],
      Relation: [this.auth.lpcDetails.Relation],
      Pensioner_Type: [this.auth.lpcDetails.Pensioner_Type],

      BSR_Code_Link_br: [this.auth.lpcDetails.BSR_Code_Link_br, [Validators.pattern('^[0-9]+$'), Validators.required]],
      Link_Br_Add: [this.auth.lpcDetails.Link_Br_Add, [Validators.required, Validators.pattern('^[a-zA-Z0-9\-,(). ]*$')]],
      Pensioner_Acct_No: [this.auth.lpcDetails.Pensioner_Acct_No, [Validators.pattern('^[a-zA-Z0-9]+$'), Validators.required]],
      IFSC_Code: [this.auth.lpcDetails.IFSC_Code, [Validators.pattern('^[a-zA-Z0-9][^@,#]+$'), Validators.required, Validators.minLength(11)]],
      BSRCode_paying_Bank: [this.auth.lpcDetails.BSRCode_paying_Bank, [Validators.pattern('^[a-zA-Z0-9]+$'), Validators.required]],
      pension_paying_br_add: [this.auth.lpcDetails.pension_paying_br_add],
      City_name_paying_bank: [this.auth.lpcDetails.City_name_paying_bank, [Validators.required, Validators.pattern('^[a-zA-Z0-9\- ]*$')]],
      pincode: [this.auth.lpcDetails.pincode, [Validators.required, Validators.pattern('^[a-z0-9]+$'),Validators.maxLength(6)]],
      CDAACCTNO: [this.auth.lpcDetails.CDAACCTNO, [Validators.pattern('^[a-zA-Z0-9-,]+$'), Validators.required]],
    });
  }



  //

  submitBasic() {
    const body = {
      perno: this.contactForm.value.personal_no,
      rank_cd: this.rankCode,
      ppo_no: this.contactForm.value.PPO_No,
      correg_ppo_no: this.contactForm.value.corr_ppo,
      aadhar_no: this.contactForm.value.Self_Aadhar,
      pan_no: this.contactForm.value.self_PAN,
      Emil_id_slef: this.contactForm.value.Self_Email,
      mobile_no_self: this.contactForm.value.Self_Mobile,
      nqsmth: this.contactForm.value.NQSMTH,
      nqsdays: this.contactForm.value.NQSDAYS,

      nok_name: this.contactForm.value.NOK_Name,
      spouse_dob: this.spouseDob+' 00:00:00.000',
      spouse_aadhar: this.contactForm.value.NOK_Aadhar,
      spouse_PAN: this.contactForm.value.NOK_PAN,
      Email_id: this.contactForm.value.NOK_Email,
      mobile_no: this.contactForm.value.NOK_Mobile1,

      fp_name: this.contactForm.value.Depn_Name,
      fp_dob: this.depnDob +' 00:00:00.000',
      fp_aadhar: this.contactForm.value.Depn_Aadhar,
      fp_email: this.contactForm.value.Depn_Email,
      fp_mob: this.contactForm.value.Depn_Mobile,
      fp_relation_cd: this.contactForm.value.Relation,
      fp_type: this.contactForm.value.Pensioner_Type,

      bsr_code: this.contactForm.value.BSR_Code_Link_br,
      link_br_add: this.contactForm.value.Link_Br_Add,
      pension_acct: this.contactForm.value.Pensioner_Acct_No,
      IFSC_code: this.contactForm.value.IFSC_Code,
      bsrcode_paying_bank: this.contactForm.value.BSRCode_paying_Bank,
      pension_paying_br_add: this.contactForm.value.pension_paying_br_add,
      Pension_paying_city: this.contactForm.value.City_name_paying_bank,
      pin_code1: this.contactForm.value.pin_code,
      cdaacctno: this.contactForm.value.CDAACCTNO,

 };

    if (this.contactForm.invalid) {
      for (const key in this.contactForm.controls) {
        const controlErrors: ValidationErrors = this.contactForm.get(key).errors;
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

    this.auth.editLpcProfile(body).subscribe(res => {
      console.log(res);
      if (res.Status == 1) {
        alert('LPC Profile Updated');
        this.router.navigate(['/uploadDoc']);
      }
      else if (res.Status == 0) {
        alert('LPC Profile Not Updated');
      }
    });

  }

  showDatepicker(value) {
    if (value == 1) {
      this.datePicker.show({
        date: new Date(),
        mode: 'date',
        androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK,
        okText: 'Save Date',
        todayText: 'Set Today'
      }).then(
        date => {
          this.toCompare = new Date(date.getFullYear(), date.getMonth(), date.getDate());
          if (this.today > this.toCompare) {
            this.spouseDob = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() ;
          }
          else {
            alert('Invalid Date');
          }
        },
        err => console.log('Error occurred while getting date: ', err)
      );
    }
    else if (value == 2) {
      this.datePicker.show({
        date: new Date(),
        mode: 'date',
        androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK,
        okText: 'Save Date',
        todayText: 'Set Today'
      }).then(
        date => {
          this.toCompare = new Date(date.getFullYear(), date.getMonth(), date.getDate());
          if (this.today > this.toCompare) {
            this.depnDob =date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() ;
            console.log(this.depnDob)
          }
          else {
            alert('Invalid Date');
          }
        },
        err => console.log('Error occurred while getting date: ', err)
      );
    }
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


  logout() {
    alert('Successfully Sign Out');
    this.router.navigate(['/home']);
  }

}
