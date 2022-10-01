import { Component, OnInit, ViewChild } from '@angular/core';
import { DatePicker } from '@ionic-native/date-picker/ngx';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-forgot-pass',
  templateUrl: './forgot-pass.component.html',
  styleUrls: ['./forgot-pass.component.scss'],
})
export class ForgotPassComponent implements OnInit {
today;
date;
dob;
email;
mobile;
username;
show=true;
  UniqueGUI: any;
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
  mpinvalue: any;
  showpass=true;
  passtype=   "password";;
  password: any;
  constructor(private datePicker: DatePicker,private auth:AuthService) { }

  ngOnInit() {}
  showDatepicker(){
    this.today = new Date();
    //alert(this.today)
    this.datePicker.show({
      date: new Date(),
      mode: 'date',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK,
      okText:"Save Date",
      todayText:"Set Today",
      minDate:this.today,
    }).then(
      date => {
        let toCompare=new Date(date.getFullYear(), date.getMonth(), date.getDate())
        if(this.today>=toCompare){
        this.dob = date.getDate()+"/"+date.toLocaleString('default', { month: 'long' })+"/"+date.getFullYear();
        this.date=date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()
        }
        else{
          alert("Selected date should be past date")
        }
      },
      err => console.log('Error occurred while getting date: ', err)
    );
  }
  
  getOtp(){ 
    this.username= this.username.toUpperCase()
    console.log(typeof this.date)
    if(this.validation()){
      if(this.validateUserID()){
      if(this.validateMail()){
        if(this.validateNo()){
          
    let body={
      "PersonalNo": this.username,
      "BirthDate":this.date+" 00:00:00.000",
      "MobileNo":this.mobile,
      "Email" : this.email
  }
  
  
    this.auth.getOtpForForgotPass(body).subscribe(res=>{
      if(res.Status==1){
        this.UniqueGUI=res.Message
        this.show=false;
      }
      else{
        this.date=""
        this.dob=""
        this.mobile=""
        this.email=""
        alert(" Provided details for forgot password request not matched with your userid!")
      }
    })

}}
      }
  }
  }
  validation(){
    if(this.username==undefined){
      alert("Please Enter User Name")
    }
    else if(this.email==undefined||this.email==""){
      alert("Please Email Id")
    }
    else if(this.mobile==undefined||this.mobile==""){
      alert("Please Enter Valid Mobile Number")
    }
    else if(this.date==undefined||this.date==""){
      alert("Please Select Date Of Birth")
    }
    
    else{
    return true;
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
validateUserID(){
  let regex= "^[a-zA-Z0-9]+$"
   if(this.username.match(regex))
   {
     return true;
   }
   else
   {
     alert("Space and Special Characters are not allowed in username");
     return false;
     
   }
 }
  onOtpChange(otpval) {
    //  alert(otpval)
    this.mpinvalue = otpval;
  }
  changePass(){
    if(this.validatePass()){
    let body={
      "PersonalNo": this.username,    
    "Password":this.password,
    "OTP":this.mpinvalue,
    "UniqueGUI": this.UniqueGUI
}
this.auth.changeForgotPass(body).subscribe(res=>{

})
  }
  }
  toggleTextPassword(val){
    //alert(val)
    if(val==1){
      this.showpass=false
      //this.passtype="text"
     this.getType(false)
    }
    if(val==2){
      this.showpass=true
      this.getType(true)
      //this.passtype="password"
    }
  }
  public getType(bool) {
    this.passtype= bool ? 'password' : 'text';
    //alert(this.passtype)
 }
 validatePass(){
  let regex="^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
  if(this.password.match(regex))
{
return true;
}
else
{
alert("Password Must Eight Character Including One Special Character,One Upper Case ,One Lower Case Letter And One Number");
return false;
}
}
}
