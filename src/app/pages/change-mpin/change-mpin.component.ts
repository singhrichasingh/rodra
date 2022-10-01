import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { AuthService } from 'src/app/auth.service';
import { PersonalMenuPopComponent } from '../personal-menu-pop/personal-menu-pop.component';

@Component({
  selector: 'app-change-mpin',
  templateUrl: './change-mpin.component.html',
  styleUrls: ['./change-mpin.component.scss'],
})
export class ChangeMpinComponent implements OnInit {
  pin1: any;
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
  pin3: any;
  pin2: any;
  randomNumberEntered: any;
  randomNumber: any;
  constructor(private auth:AuthService,private router:Router,private popoverController:PopoverController) { }

  ngOnInit() {
    //this.randomNumber= 
    this.generateRandomNumber(1111,9999);
  }
  generateRandomNumber(min,max){
    var rand=min+Math.random()*(max-min);
        rand=Math.round(rand);
        this.randomNumber= rand.toString();
        if(this.randomNumberEntered != ''){
          this.randomNumberEntered = '';
        }
  }
  changePin(){
    if(this.validation()){ 
    if(this.lengthValidation()){
      if(this.randomNumber !=this.randomNumberEntered){
        //this.randomNumberEntered="";
        //this.randomNumber=
        this.generateRandomNumber(1111,9999);
        alert("Enter Correct Captcha")
      }
else{
      if(this.pin2==this.pin3){
    let personalNo=localStorage.getItem('personalNo')
    let body={
      "PersonalNo": personalNo,
      "OldMPin":this.pin1,
      "NewMPin":this.pin2
  }
this.auth.changeUserMpin(body).subscribe(res=>{
    if(res.Status==1){
      alert("PIN Changed Sucessfully")
      this.router.navigate(['/personalInfo'])
    }
    else if(res.Status==0){
      //this.randomNumberEntered = ''
      this.pin1=''
      this.pin2=''
      this.pin3=''
      this.generateRandomNumber(1111,9999);
      alert(res.Message)
    }
  })
}
else{
 // this.randomNumberEntered = ''
  alert("PIN Not Matched")
}
    }
  }
    }
  }
  lengthValidation(){
    if(this.pin1.length!=4){
      alert("4 Digit Old MPIN Required")
    }
  else if(this.pin2.length!=4){
      alert("4 Digit New MPIN Required")
    }
    else if(this.pin3.length!=4){
      alert("4 Digit Confirm MPIN Required")
    }
    else{
    return true;
    }
  }
  validation(){
    console.log(this.pin1)
    if(this.pin1==undefined||this.pin1==""){
      alert("Please Enter Old MPIN ")
    }
  else if(this.pin2==undefined||this.pin2==""){
      alert("Please Enter New MPIN")
    }
    else if(this.pin3==undefined||this.pin3==""){
      alert("Please Confirm MPIN")
    }
    else{
    return true;
    }
  }
  onOtpChange(val,type) {
    if(type==1){
      this.pin1 = val;
    }
    if(type==2){
      this.pin2=val
    }
    if(type==3){
      this.pin3 = val;
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
  //localStorage.clear();
  alert("Successfully Sign Out")
  this.router.navigate(['/home'])
}
}
