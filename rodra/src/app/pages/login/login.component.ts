import { Component, OnInit,ViewChild } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

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
     'height': '50px',
   }
 };
  constructor(private navCtrl: NavController,private auth:AuthService,private router:Router) { }
  username;
  password;
  show=true;
  dontshow=false;
  profile
  ngOnInit() {}
  registerIn(){
    this.navCtrl.navigateRoot('/register')
  }

  login(){
   // console.log(this.username)
  //   let body={
  //     personalNo:"IC31807",
  //     password:"Abc@1234"
  // }
  let body={
    personalNo:this.username,
    password:this.password
}
  this.auth.loginAdmin(body).then(res=>{
    this.profile=this.auth.userProfile.Data;
    let navigationExtras: NavigationExtras = {
      queryParams: {
        userDetail: this.profile
      }
    };
    this.router.navigate(['/personalInfo'],navigationExtras)
  })
  //console.log(JSON.stringify(res))
  // .then(res=>{
  // console.log(res);
  // 
  // },err=>{

  // })
  }
  onOtpChange(otpval) {
    //  alert(otpval)
    this.mpinvalue = otpval;
  }
  segmentChanged(ev){
     if(ev.target.value=="user"){
       this.show=true;
       this.dontshow=false;
     }
     else if(ev.target.value=="mpin"){
       this.show=false;
       this.dontshow=true
     }
  }
}
