/* eslint-disable eqeqeq */

import { Component, OnInit, ViewChild } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';

import { AuthService } from 'src/app/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  @ViewChild('ngOtpInput', { static: false }) ngOtpInput: any;

  mpinvalue;
  dataFromService: any = '';
  otp = false;
  showpass = true;
  otpverified = false;
  otpvalue: string;
  encryptMsg='*$96@!05%^64';
  config = {     //otp config..........
    allowNumbersOnly: true,
    length: 4,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: '',
    inputStyles: {
      width: '50px',
      height: '50px',
    }
  };
  randomNumber: any;
  randomNumberEntered: any = '';
  isActiveToggleTextPassword: any;
  passtype = 'password';
  loading: any;
  username;
  password;
  show = true;
  dontshow = false;
  profile;
  mPin;

  constructor(private navCtrl: NavController, private auth: AuthService, private router: Router, private loadingCtrl: LoadingController) { }

  ngOnInit() {

  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter');
    //this.randomNumberEntered = '';
    this.generateRandomNumber(1111, 9999);
  }

  generateRandomNumber(min, max) {
    let rand = min + Math.random() * (max - min);
    rand = Math.round(rand);
    this.randomNumber = rand.toString();
    if(this.randomNumberEntered != ''){
      this.randomNumberEntered = '';
    }
    //this.randomNumberEntered = this.randomNumber;
  }

  registerIn() {
    this.navCtrl.navigateRoot('/register');
  }

  moveFocus(nextElement) {

    nextElement.setFocus();
    
  }


  login() {
    if (this.randomNumber !== this.randomNumberEntered) {
      //this.randomNumberEntered = '';
      this.generateRandomNumber(1111, 9999);
      alert('Enter Correct Captcha');
    }
    else {
      //console.log(this.username)
      if (this.validation()) {
      this.username = this.username.toUpperCase();
       if (this.validateUserID()) {
         // console.log(this.username)
         // console.log(this.password)
          const body = {
            personalNo: this.username,
            password: this.password
          };

          this.auth.loginAdmin(body).subscribe(res => {
              if (res.Status == 1) {
                localStorage.setItem('token', res.Token);
                console.log("token")
               
                localStorage.setItem('mpin', res.Data[0].mpin);
                this.auth.userProfile = res.Data[0];
                localStorage.setItem('personalNo', this.auth.userProfile.Personal_no);
                this.presentAlert();
                this.getData();
              }
              else {
                this.generateRandomNumber(1111, 9999);
                alert('User Id or Password is incorrect');
              }
            }, err => {
               this.generateRandomNumber(1111, 9999);
              console.log(err);
            });
        }
      }
    }
  }

  validation() {
    if (this.username === undefined) {
      alert('Please Enter User ID');
    }
    else if (this.password === undefined) {
      alert('Please Enter Password');
    }

    else {
      return true;
    }
  }

  validateUserID() {
    const regex = '^[a-zA-Z0-9]+$';
    if (this.username.match(regex)) {
      return true;
    }
    else if (!this.username.match(regex)){
      alert('Space and Special Characters not allowed in UserId');
      return false;

    }
  }
  getData() {
    const body = {
      personalNo: localStorage.getItem('personalNo')
    };

    this.auth.getUserInfo(body).subscribe(res => {
      this.auth.userData = res[0];
      localStorage.setItem('mpin', this.auth.userData.mpin);
     // localStorage.setItem('mpin', res.Data[0].mpin);
      this.loadingCtrl.dismiss();
      this.router.navigate(['/personalInfo']);
    });
  }

  async presentAlert() {
    this.loading = await this.loadingCtrl.create({
      duration: 1000,
      message: 'Please wait...'
    });
    this.loading.present();

  }

  onOtpChange(otpval) {

    this.mpinvalue = otpval;
    console.log(this.mpinvalue.length);
  }

  segmentChanged(ev) {
    if (ev.target.value === 'user') {
      this.generateRandomNumber(1111, 9999);
      this.show = true;
      this.dontshow = false;
    }
    else if (ev.target.value === 'mpin') {
      this.show = false;
      this.dontshow = true;
    }
  }

  loginWithMpin() {
    const personalNo = localStorage.getItem('personalNo');
    //if(personalNo!=undefined||personalNo!=null){
    if (this.pinValidation()) {
      const body = {
        personalNo:personalNo,
        mPin: this.mpinvalue
      };
      this.auth.loginWithMpin(body).subscribe(res => {
        if (res.Status === 1) {
          this.getData();
          //this.router.navigate(['/personalInfo'])
        }
        else {
          alert('Invalid MPIN');
        }
      });
    }
 // }
  // else{

  // }
  }

  pinValidation() {
    if (this.mpinvalue !== undefined) {
      if (this.mpinvalue.length !== 4) {
        alert('Please Enter 4 Digit ');
        return false;
      }
      else {
        return true;
      }
    }
    else {
      alert('Please Enter MPin');
    }
  }

  moveTo(val) {
    if (val === 1) {
      this.router.navigate(['/changePass'], { queryParams: { changeType: 1 } });
    }
    else {
      this.router.navigate(['/changemPin'], { queryParams: { changeType: 2 } });
    }
  }

  toggleTextPassword(val) {
    if (val === '1') {
      this.showpass = false;
      this.getType(false);
    }
    if (val === '2') {
      this.showpass = true;
      this.getType(true);
    }
  }

  public getType(bool) {
    this.passtype = bool ? 'password' : 'text';

  }

}
