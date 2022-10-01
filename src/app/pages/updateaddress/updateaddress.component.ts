/* eslint-disable eqeqeq */
/* eslint-disable prefer-const */
/* eslint-disable quote-props */
/* eslint-disable @typescript-eslint/semi */
/* eslint-disable no-trailing-spaces */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/quotes */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { AuthService } from 'src/app/auth.service';
import { PersonalMenuPopComponent } from '../personal-menu-pop/personal-menu-pop.component';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-updateaddress',
  templateUrl: './updateaddress.component.html',
  styleUrls: ['./updateaddress.component.scss'],
})
export class UpdateaddressComponent implements OnInit {
  states: any;
  district: any;
  selectedState: any;
  selectedDistrict: any;
  // houseNo: any;
  // mohalla: any;
  // village: any;
  tehsil: any;
  // postOffice: any;
  // policeStation: any;
  // pinCode: any;
  // mobile: any;

  constructor(private auth: AuthService,private router: Router,private popoverController: PopoverController, private formBuilder: FormBuilder) { }

ngOnInit() {
  this.getState();
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
getDistrictValue(event){
  this.selectedDistrict=event.target.value;
}
//mobile
get houseNo() {
  return this.updateAddressForm.get('houseNo');
}
get mobile() {
  return this.updateAddressForm.get('mobile');
}
get postOffice() {
  return this.updateAddressForm.get('postOffice');
}
get mohalla() {
  return this.updateAddressForm.get('mohalla');
}
get village() {
  return this.updateAddressForm.get('village');
}
get policeStation() {
  return this.updateAddressForm.get('policeStation');
}
get pinCode() {
  return this.updateAddressForm.get('pinCode');
}
updateAddressForm = this.formBuilder.group({
  mohalla: ['',[Validators.pattern('^[a-zA-Z0-9\-, ]*$'),]],
  village:['',[Validators.pattern('^[a-zA-Z0-9\-, ]*$'),]],
  pinCode:['',[Validators.pattern('^[a-zA-Z0-9\-, ]*$'),Validators.maxLength(6),Validators.minLength(6)]],
  houseNo:['',[Validators.pattern('^[a-zA-Z0-9\-, ]*$'),]],
  postOffice:['',[Validators.pattern('^[a-zA-Z0-9\-, ]*$'),]],
  policeStation:['',[Validators.pattern('^[a-zA-Z0-9\-, ]*$'),]],
  mobile:['',  [
    Validators.required,
    Validators.pattern('(0/91)?[0-9]{10}'),
  ]],
});
public errorMessages = {
  houseNo: [ { type: 'pattern', message: 'special character not allowed' } ],
  mobile: [
    { type: 'required', message: 'You must enter mobile number' },
    { type: 'pattern', message: 'Please enter 10 digit mobile number only' }
  ],
  postOffice: [ { type: 'pattern', message: 'special character not allowed' } ],
  mohalla: [ { type: 'pattern', message: 'special character not allowed' } ],
  village:[{ type: 'pattern', message: 'special character not allowed' }],
  policeStation:[{ type: 'pattern', message: 'special character not allowed' }],
  pinCode:[{ type: 'pattern', message: 'special character not allowed' },
  { type: 'minlength', message: 'Minimum  6  digit required' },
  { type: 'maxlength', message: 'Name cant be longer than 6 digit' },],
}
//

updateAddress(){
  let personalNo=localStorage.getItem('personalNo')
      let body= {
        "Personal_no": personalNo,
          "House_no": this.updateAddressForm.value.houseNo,
          "Moh_st": this.updateAddressForm.value.mohalla,
          "Village": this.updateAddressForm.value.village,
          // "Tehsil": this.tehsil,
          "Post_office": this.updateAddressForm.value.postOffice,
          "Police_stn": this.updateAddressForm.value.policeStation,
          "District_cd": this.selectedDistrict,
          "State_cd": this.selectedState,
          "Pin_code": this.updateAddressForm.value.pinCode,
          "Mobile_no": this.updateAddressForm.value.mobile
      }
      if (this.updateAddressForm.invalid) {
        alert("Please Fill All Fields Correct Format");
        return;
    }
      
        this.auth.updateAddress(body).subscribe(res=>{
          console.log('update address res',body);
          
           if(res.Status==1){
             alert("Updated Successfully");
             this.getData();
             //this.router.navigate(['/personalInfo'])
           }
          else if(res.Status==0){
            alert("Please Fill All Fields");
            //this.getData();
            //this.router.navigate(['/personalInfo'])
          }
        })
}

getData(){
  let persno=localStorage.getItem('personalNo')
  let body={
    "personalNo": persno
}
  this.auth.getUserInfo(body).subscribe(res=>{
   this.auth.userData=res[0];
   this.router.navigate(['/personalInfo'])
  
  })
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
  alert("Successfully Sign Out")
    //localStorage.clear();
    this.router.navigate(['/home'])
}

}
