import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { AuthService } from 'src/app/auth.service';
import { PersonalMenuPopComponent } from '../personal-menu-pop/personal-menu-pop.component';

@Component({
  selector: 'app-updatemailmobile',
  templateUrl: './updatemailmobile.component.html',
  styleUrls: ['./updatemailmobile.component.scss'],
})
export class UpdatemailmobileComponent implements OnInit {
  @ViewChild('ngOtpInput', { static: false}) ngOtpInput: any;
  config = {     //otp config..........
   allowNumbersOnly: true,
   length: 4,
   isPasswordInput: false,
   disableAutoFocus: false,
   placeholder: '',
   inputStyles: {
     'width': '50px',
     'height': '50px',
   }
 };
  otpval1: any;
  otpval2: any;
  uniqueGui1: any;
  uniqueGui2: any;
  constructor(private auth:AuthService,private router:Router,private popoverController:PopoverController,) { }
   segmentValue='mail'
   mobileshow=true
   mailshow=true
   email
   mobile
  ngOnInit() {}
  segmentChanged(event){
    let val=event.target.value
    this.segmentValue=val
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
  getOtp(value){
    if(value==1){
      if(this.validateMail()){
      this.mailshow=false;
      this.getOtpForVerification(1)
      }
    }
    else{
      if(this.validateNo()){
      this.mobileshow=false;
      this.getOtpForVerification(2)
      }
    }
  }
  getOtpForVerification(val){
    let personalNo=localStorage.getItem('personalNo')
    
  if(val==1){
    let body={
      "PersonalNo":personalNo,
      "Email":this.email,
      "UserName":personalNo
  }
    
    this.auth.getOtpForMailChange(body).subscribe(res=>{
    if(res.Status==1){
      this.uniqueGui1=res.Message
    }
    else{
      this.email=""
    }
    }
    )
  }
  else{
    let body={
      "PersonalNo":personalNo,
      "MobileNo":this.mobile
  }
    this.auth.getOtpForMobileChange(body).subscribe(res=>{
      if(res.Status==1){
        this.uniqueGui2=res.Message
      }
      else{
        this.mobile=''
      }
    })
  }
  }
  onOtpChange(val,event){
    if(val==1){
    this.otpval1 = event;
    }
    else{
      this.otpval2 = event;
    }
  }
  submit(value){
    let personalNo=localStorage.getItem('personalNo')
    if(value==1){
     
let body={
  "PersonalNo":personalNo,
  "UniqueGUI": this.uniqueGui1,   
  "OTP":this.otpval1,       
  "Email": this.email
} 
this.auth.changeMail(body).subscribe(res=>{
if(res.Status==1){
  alert("Email Id Changed Successfully")
  this.getData();
}
else{
  alert("Something Wrong")
}
})
  }
    else{
let body={
  "PersonalNo":personalNo,
    "UniqueGUI": this.uniqueGui2,   
    "OTP":this.otpval2,       
    "MobileNo": this.mobile
}
this.auth.changeMobileNo(body).subscribe(res=>{
  if(res.Status==1){
    alert("Mobile Number Changed Successfully")
    this.getData();
  }
  else{
    alert("Something Wrong")
  }
})
    
  }
  }

  validateMail(){
    let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    if(this.email.match(regex))
 {
 return true;
 }
 else
 {
 alert("You have entered an invalid email id!");
 return false;
 }
  }
  validateNo(){
   
    let regex = /[0-9]+/g
    if( this.mobile.match(regex))
    {
      if(this.mobile.length<10){
        alert("Enter 10 digit mobile no.")
        return false;
      }
    //alert("Enter Valid Mobile No!");
    return true;
    }
    else
    {
    alert("You have entered an invalid mobile no!");
    return false;
    }
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
}

