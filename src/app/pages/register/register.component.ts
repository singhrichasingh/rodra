/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DatePicker } from '@ionic-native/date-picker/ngx';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  dobdate1: string;
  dobdate2: string;
userId: any;
userName
  user: string;
  //email: any;
  //password: any;
  mobile: any;
  registeredAs = 1;
  randomNumber: any;
  randomNumberEntered: string;
  uniqueGUI: any;
  value: any;
  passtype = 'password';
  show = true;
  show1=false;
  show2=false;
  @ViewChild('ngOtpInput', { static: false }) ngOtpInput: any;
  config = {     //otp config..........
    allowNumbersOnly: true,
    length: 4,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: '',
    inputStyles: {
      width: '50px',
      height: '50px'
    }
  };
  showpass = true;
  toCompare: Date;
  showpass1= true;
  showpass2=true;
  passtype1= 'password';
  passtype2= 'password';
  constructor(private datePicker: DatePicker, private auth: AuthService, private formBuilder: FormBuilder,private router:Router) { }
  dobdate: any;
  today;

  ngOnInit() {
    this.today = new Date();
    this.registrationForm.value.username="EET778"
    //this.randomNumber=
    this.generateRandomNumber(1111, 9999);
  }
  generateRandomNumber(min, max) {
    let rand = min + Math.random() * (max - min);
    rand = Math.round(rand);
    this.randomNumber = rand.toString();
    
    if(this.randomNumberEntered != '' || this.randomNumberEntered!=undefined){
      this.registrationForm.value.captcha = '';
      this.randomNumberEntered = ''
    
    }
    //return rand.toString();
  }
  showDatepicker(val) {

    if (val == 1) {
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
            this.dobdate = date.getFullYear()+ '-' +(date.getMonth() + 1)+ '-' +date.getDate();
          }
          else {
            alert('Invalid Date');
          }
        },
        err => console.log('Error occurred while getting date: ', err)
      );
    }
    else if (val == 2) {
      this.datePicker.show({
        date: new Date(),
        mode: 'date',
        androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK,
        okText: 'Save Date',
        todayText: 'Set Today'
      }).then(
        date => {
          const toCompare = new Date(date.getFullYear(), date.getMonth(), date.getDate());
          if (this.today > toCompare && this.toCompare < toCompare) {
            this.dobdate1 = date.getFullYear()+ '-' +(date.getMonth() + 1)+ '-' +date.getDate();
          }
          else {
            alert('Commission date can\'t be greater then today date or can\'t be less than date of birth');
          }
        },
        err => console.log('Error occurred while getting date: ', err)
      );
    }
    else if (val == 3) {
      this.datePicker.show({
        date: new Date(),
        mode: 'date',
        androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK,
        okText: 'Save Date',
        todayText: 'Set Today'
      }).then(
        date => {
          const toCompare = new Date(date.getFullYear(), date.getMonth(), date.getDate());
          if (this.today > toCompare && this.toCompare < toCompare) {
            this.dobdate2 = date.getFullYear()+ '-' +(date.getMonth() + 1)+ '-' +date.getDate();
          }
          else {
            alert('Retirement date can\'t be greater then today date or can\'t be less than date of birth');
          }
        },
        err => console.log('Error occurred while getting date: ', err)
      );
    }
  }

  select(ev) {
    
    this.registeredAs = ev.target.value;
 

  }
  getOtp() {
    this.randomNumberEntered = this.registrationForm.value.captcha;
    console.log('ggkujij');
    console.log(this.randomNumberEntered);
    if (this.randomNumber != this.randomNumberEntered) {
      //this.randomNumber=
      this.generateRandomNumber(1111, 9999);
      alert('Enter Correct Captcha');
    }
    else {
      const body = {
        PersonalNo: this.registrationForm.value.username.toUpperCase(),
        BirthDate: this.registrationForm.value.dob + ' 00:00:00.000',
        CommissionDate: this.registrationForm.value.doc + ' 00:00:00.000',
        DischDate:  this.registrationForm.value.dor + ' 00:00:00.000',
        MobileNo: this.registrationForm.value.phone,
        Email:this.registrationForm.value.email
      };
  
      this.auth.getOtpForRegister(body).subscribe(res => {
        console.log(JSON.stringify(res))
                if (res.Status == 1) {
          this.uniqueGUI = res.Message;
          this.show = false;
          this.show1=true;
           this.show2=false;
        }
        else {
          this.generateRandomNumber(1111, 9999);
          alert(res.Message);
        }
      });
    }
  }
  onOtpChange(val) {
    this.value = val;
  }
  validation() {
    if (this.username == undefined) {
      alert('Please Enter Personal No');
    }
    else if (this.user == undefined) {
      alert('Please Enter User Name');
    }
    else if (this.dobdate == undefined) {
      alert('Please Select Date Of Birth');
    }
    else if (this.dobdate1 == undefined) {
      alert('Please Enter Date of Commission');
    }
    else if (this.dobdate2 == undefined) {
      alert('Please Enter Date of Retirement/Death');
    }
    else if (this.email == undefined) {
      alert('Please Email Id');
    }
    else if (this.mobile == undefined) {
      alert('Please Enter Valid Mobile Number');
    }

    else if (this.password == undefined) {
      alert('Please Enter Password');
    }
    else if (this.registeredAs == undefined) {
      alert('Please Select Registered As');
    }
    else {
      return true;
    }
  }


  submitOtp(){
    const body={  
      OTP: this.value,
      UniqueGUI: this.uniqueGUI
    }
    this.auth.submitOtp(body).subscribe(res=>{
      if (res.Status == 1) {
        this.show=false;
        this.show1=false;
        this.show2=true;
       }
      else{
        alert(res.Message)
      }
    })
  }


  register() {
    if(this.registrationForm.value.password==this.registrationForm.value.password1){
    const body = {
      PersonalNo: this.registrationForm.value.username,
      BirthDate: this.registrationForm.value.dob + ' 00:00:00.000',
      CommissionDate: this.registrationForm.value.doc + ' 00:00:00.000',
      DischDate: this.registrationForm.value.dor + ' 00:00:00.000',
      UserName: this.registrationForm.value.name,
      email: this.registrationForm.value.email,
      Password: this.registrationForm.value.password,
      Uid: this.registrationForm.value.username,
      MobileNo: this.registrationForm.value.phone,
      RegisteredAs: this.registeredAs,
      CountryCode: '91'
      // OTP: this.value,
      // UniqueGUI: this.uniqueGUI
    };
    this.auth.register(body).subscribe(res => {
      console.log(JSON.stringify(res))
      if (res.Status == 1) {
        alert('Registered Successfully');
        this.router.navigate(['/login'])
        
      }
    });
  }
  else{
    alert("Password does not match")
  }
  }

  get username() {
    return this.registrationForm.get('username');
  }
  get name() {
    return this.registrationForm.get('name');
  }
  get email() {
    return this.registrationForm.get('email');
  }
  get phone() {
    return this.registrationForm.get('phone');
  }
  get password() {
    return this.registrationForm.get('password');
  }
  get password1() {
    return this.registrationForm.get('password');
  }
  get dob() {
    return this.registrationForm.get('dob');
  }
  get doc() {
    return this.registrationForm.get('doc');
  }
  get dor() {
    return this.registrationForm.get('dor');
  }
  get captcha() {
    return this.registrationForm.get('captcha');
  }
  validateNo() {

    const regex = /[0-9]+/g;
    if (this.mobile.match(regex)) {
      if (this.mobile.length < 10) {
        alert('Enter 10 digit mobile no.');
        return false;
      }
      return true;
    }
    else {
      alert('You have entered an invalid mobile no!');
      return false;
    }
  }
  // validatePass(){
  //   let regex="^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
  //   if(this.password.match(regex))
  // {
  // return true;
  // }
  // else
  // {
  // alert("Password Must Eight Character Including One Special Character,One Upper Case ,One Lower Case Letter And One Number");
  // return false;
  // }
  // }
  // validateUserID(){

  //   let regex= "^[A-Z0-9]*$"
  //    if( this.username.match(regex))
  //    {
  //      return true;
  //    }
  //    else
  //    {
  //      alert("Space and Special Charcters not allowed");
  //      return false;

  //    }
  //  }
  //  validateMail(){
  //    let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  //    if(this.email.match(regex))
  // {
  // return true;
  // }
  // else
  // {
  // alert("You have entered an invalid email id!");
  // return false;
  // }
  //  }
  // toggleTextPassword(val) {
  //   //alert(val)
  //   if (val == 1) {
  //     this.showpass = false;
  //     //this.passtype="text"
  //     this.getType(false);
  //   }
  //   if (val == 2) {
  //     this.showpass = true;
  //     this.getType(true);
  //     //this.passtype="password"
  //   }
  // }

  toggleTextPassword(type,val){
    console.log(type+"   "+val)
    if(type==1){
    if(val==1){
      this.showpass1=false
      //this.passtype="text"
     this.getType(type,false)
    }
    if(val==2){
      this.showpass1=true
      this.getType(type,true)
      //this.passtype="password"
    }
  }
  if(type==2){
    if(val==1){
      this.showpass2=false
      //this.passtype="text"
     this.getType(type,false)
    }
    if(val==2){
      this.showpass2=true
      this.getType(type,true)
      //this.passtype="password"
    }
  }
}

moveFocus(nextElement) {
nextElement.setFocus();
}

public getType(type,bool) {
  if(type==1){
  this.passtype1=bool ? 'password' : 'text';
  }
  if(type==2){
    this.passtype2=bool ? 'password' : 'text';
    }
}

  // public getType(bool) {
  //   this.passtype = bool ? 'password' : 'text';
  //   //alert(this.passtype)
  // }

  registrationForm = this.formBuilder.group({
    username: ['', [Validators.required,
    Validators.pattern('^[a-zA-Z0-9]+$'),
    Validators.maxLength(8),
    ]
    ],
    name: ['',
      [
        Validators.required, Validators.maxLength(30), Validators.pattern('^[a-zA-Z_ ]+$')]], 
    email: [
      '',
      [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$')
      ]
    ],
    phone: [
      '',
      [
        Validators.required,
        Validators.pattern('(0/91)?[0-9]{10}'),
      ]
    ],
    dob: ['', [Validators.required,
    Validators.maxLength(30)
    ]
    ],
    doc: ['', [Validators.required,
    Validators.maxLength(30)
    ]
    ],
    dor: ['', [Validators.required,
    Validators.maxLength(30)
    ]
    ],
    password: ['',
      [
        Validators.required,
        Validators.minLength(8),
      ]
    ],
    password1: ['',
    [
      Validators.required,
      Validators.minLength(8),
    ]
  ],
    captcha: ['',
      [
        Validators.required,

      ]
    ],


  });




  public errorMessages = {
    username: [
      { type: 'required', message: 'You must enter username' },
      { type: 'maxlength', message: 'Name cant be longer than 8 characters' },
      { type: 'pattern', message: 'Please Enter Validate User Id' }

    ],
    name: [
      { type: 'required', message: 'You must enter name' },
      { type: 'maxlength', message: 'Name cant be longer than 30 characters' },
      { type: 'pattern', message: 'Special characters not allowed' }
    ],
    email: [
      { type: 'required', message: 'You must enter Email' },
      { type: 'pattern', message: 'Please enter a valid email address' }
    ],
    phone: [
      { type: 'required', message: 'You must enter phone number' },
      { type: 'pattern', message: 'Please enter 10 digit phone number only' }
    ],
    dob: [
      { type: 'required', message: 'You must enter Date of Birth' },
      { type: 'maxlength', message: 'Name cant be longer than 30 characters' }

    ],
    doc: [
      { type: 'required', message: 'You must enter Date of Commission' },
      { type: 'maxlength', message: 'Name cant be longer than 30 characters' }

    ],
    dor: [
      { type: 'required', message: 'You must enter Date of Retirement' },
      { type: 'maxlength', message: 'Name cant be longer than 30 characters' }

    ],
    password: [
      { type: 'required', message: 'You must enter password' },
      { type: 'minlength', message: 'password must be at least 8 characters long.' },
      // { type: 'pattern', message: 'Your username must contain only numbers and letters.' },

    ],
    password1: [
      { type: 'required', message: 'You must enter password' },
      { type: 'minlength', message: 'password must be at least 8 characters long.' },
      // { type: 'pattern', message: 'Your username must contain only numbers and letters.' },

    ],

  };
}
