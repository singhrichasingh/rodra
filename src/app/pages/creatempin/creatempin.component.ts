import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { AuthService } from 'src/app/auth.service';
import { PersonalMenuPopComponent } from '../personal-menu-pop/personal-menu-pop.component';

@Component({
  selector: 'app-creatempin',
  templateUrl: './creatempin.component.html',
  styleUrls: ['./creatempin.component.scss'],
})
export class CreatempinComponent implements OnInit {
  mpinvalue;
  dataFromService:any=""; 
  otp=false;
  otpverified = false;
  otpvalue: string;
  @ViewChild('ngOtpInput', { static: false}) ngOtpInput: any;
  config = {     //otp config..........
   allowNumbersOnly: true,
   length: 4,
   isPasswordInput: false,
   disableAutoFocus: false,
   placeholder: '',
   inputStyles: {
     'width': '50px',
     'height': '50px'
   }
 };
  mpinvalue2: any;
  mpinCheck: any;
  constructor(private auth:AuthService,private router:Router,private popoverController:PopoverController) { }

  ngOnInit() {
   // this.checkForMpin()
  }
onOtpChange(otpval,type) {
if(type==1){
  this.mpinvalue = otpval;
}
if(type==2){
  this.mpinvalue2=otpval
}
}
checkForMpin(){
  this.mpinCheck=localStorage.getItem('mpin')
  console.log("Mympin")
  console.log(this.mpinCheck)
  if(this.mpinCheck!=undefined||this.mpinCheck!=""){
    alert("Your MPIN is already created .If You want to change MPIN then goto Change MPIN page")
    this.router.navigate(['/changemPin'])
  }
}
createMpin(){
  if(this.validation()){
    if(this.mpinvalue.length==4){
    if(this.mpinvalue==this.mpinvalue2){
let body={
  "personalNo": localStorage.getItem('personalNo'),
  "mPin":this.mpinvalue
}
this.auth.createMpin(body).subscribe(res=>{
  if(res.Status==1){
    alert("Successfully created MPIN")
    this.getData();
    this.router.navigate(['/personalInfo'])
  }
  else{
    this.mpinvalue=''
    this.mpinvalue2=''
  }
})
  }
  else{
    alert("MPIN Not Matched")
  }
}
else{
  alert("Please Enter 4 digit mpin")
}
}
  


}


getData() {
 // this.persno = localStorage.getItem('personalNo');
  const body = {
    personalNo: localStorage.getItem('personalNo')
  };
  this.auth.getUserInfo(body).subscribe(res => {
    this.auth.userData = res[0];
    localStorage.setItem('mpin', this.auth.userData.mpin);
    this.router.navigate(['/personalInfo']);
    console.log(JSON.stringify(this.auth.userData));
  });
}
validation(){
    if(this.mpinvalue==undefined||this.mpinvalue==''){
      alert("Please Enter New MPIN ")
    }
  else if(this.mpinvalue2==undefined||this.mpinvalue2==''){
      alert("Please Confirm MPIN")
    }
    else{
    return true;
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
  logout(){
    alert("Successfully Sign Out")
    //localStorage.clear();
    this.router.navigate(['/home'])
  }
}
