import { Component, OnInit, ViewChild } from '@angular/core';

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
  constructor() { }

  ngOnInit() {}
onOtpChange(otpval) {
  //  alert(otpval)
  this.mpinvalue = otpval;
}

}
