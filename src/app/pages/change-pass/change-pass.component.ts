import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { AuthService } from 'src/app/auth.service';
import { PersonalMenuPopComponent } from '../personal-menu-pop/personal-menu-pop.component';

@Component({
  selector: 'app-change-pass',
  templateUrl: './change-pass.component.html',
  styleUrls: ['./change-pass.component.scss'],
})
export class ChangePassComponent implements OnInit {
  pass;
  pass1;
  pass2
  mpinvalue: any;
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
  type: any;
  pin1: any;
  showpass1=true;
  showpass2=true;
  showpass3=true;
  passtype1= "password";
  passtype2= "password";
  passtype3= "password";
  randomNumber: any;
  randomNumberEntered: any;
  
  constructor(private router:Router,private route: ActivatedRoute,private auth:AuthService,private formBuilder: FormBuilder,
    private popoverController:PopoverController) { 
    this.route.queryParams
    .subscribe(params => {
      console.log(params); 
      this.type = params.changeType;
      //console.log(this.userType);
    }
  );
  }

  ngOnInit() {
    //this.randomNumber=
    this.generateRandomNumber(1111,9999);
  }
  onOtpChange(otpval) {
     alert(otpval)
    this.pin1 = otpval;
  }
  changePass(){ 
    if(this.validation()){
      if(this.validatePass()){
        if(this.randomNumber !=this.randomNumberEntered){
         
          //this.randomNumber=
          this.generateRandomNumber(1111,9999);
          alert("Enter Correct Captcha")
        }
        else{
    if(this.pass1==this.pass2){
    let personalNo=localStorage.getItem('personalNo')
    let body={
      "PersonalNo":personalNo,
      "Password":this.pass1,
      "OldPassword":this.pass
  }
  this.auth.changePassword(body).subscribe(res=>{
   
    if(res.Status==1){
      alert("Password Changed Successfully")
      this.router.navigate(['/personalInfo'])
    }
    else{
      this.pass1=''
      this.pass=''
      this.pass2=''
      this.generateRandomNumber(1111,9999);
     alert(res.Message);
    }
  })
    }
    else{
      this.generateRandomNumber(1111,9999);
      alert("Password Not Matched")
    }
  }
  }
}
  }
  validation(){
    if(this.pass==undefined||this.pass==''){
      alert("Please Enter Old Password ")
    }
  else if(this.pass1==undefined||this.pass1==''){
      alert("Please Enter New Password")
    }
    else if(this.pass2==undefined||this.pass2==''){
      alert("Please Confirm New Password")
    }
    else{
    return true;
    }
  }

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
  if(type==3){
    if(val==1){
      this.showpass3=false
      //this.passtype="text"
     this.getType(type,false)
    }
    if(val==2){
      this.showpass3=true
      this.getType(type,true)
      //this.passtype="password"
    }
  }
  }
  public getType(type,bool) {
    if(type==1){
    this.passtype1=bool ? 'password' : 'text';
    }
    if(type==2){
      this.passtype2=bool ? 'password' : 'text';
      }
     if(type==3){
        this.passtype3=bool ? 'password' : 'text';
        }
    //alert(this.passtype)
 }
  changePin(){
    if(this.randomNumber !=this.randomNumberEntered){
      //this.randomNumber=
      this.generateRandomNumber(1111,9999);
      alert("Enter Correct Captcha")
    }
    let body={
      "PersonalNo": "IC31807",
      "OldMPin":"1236",
      "NewMPin":"1236"
  }
this.auth.changeUserMpin(body).subscribe(res=>{
    
  })
  }



  registrationForm = this.formBuilder.group({
    username: ['', [Validators.required,
                    Validators.maxLength(30)
                    ]],
    name: ['', [Validators.required, Validators.maxLength(30)]],
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
        Validators.pattern("(0/91)?[0-9]{10}"),       
      ]
    ],
    password: ['', 
            [    
              Validators.required,
               Validators.minLength(8),
               //this.getpass.bind(this)
              ]
             ],
    cpassword: ['', 
            [    
              Validators.required,
               Validators.minLength(8),
              // this.matchpass.bind(this)
              ]
             ],   
  });
  validatePass(){
    let regex="^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
    if(this.pass1.match(regex))
  {
  return true;
  }
  else
  {
  alert("Password Must Eight Character Including One Special Character,One Upper Case ,One Lower Case Letter And One Number");
  return false;
  }
  }
  generateRandomNumber(min,max){
    var rand=min+Math.random()*(max-min);
        rand=Math.round(rand);
        this.randomNumber= rand.toString();
        if(this.randomNumberEntered != ''){
          this.randomNumberEntered = '';
        }
  }

  moveFocus(nextElement) {

    nextElement.setFocus();
    
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
    //localStorage.clear();
    alert("Successfully Sign Out")
    this.router.navigate(['/home'])
  }
}
