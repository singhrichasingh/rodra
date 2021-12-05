import { Component, OnInit } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
@Component({
  selector: 'app-whatsnew',
  templateUrl: './whatsnew.component.html',
  styleUrls: ['./whatsnew.component.scss'],
})
export class WhatsnewComponent implements OnInit {
  whatsNew=[
    {name:"Docus Reqd to be submit when Veteran/NOK changes their PDA",link:"https://rodra.gov.in/Circular-206.pdf"},
    {name:"Kind attention of all Veteran Offrs and  their NOKs",link:"https://rodra.gov.in/message%20to%20veterans.pdf"},
    {name:"PCDA-Pension-Circular-218",link:"https://rodra.gov.in/PCDA-Pension-Circular-218.pdf"},
    {name:"HOW TO DOWNLOAD ePPO FROM DIGILOCKER",link:"https://rodra.gov.in/how%20to%20download%20ePPO.pdf"},
    {name:"Advisory to spouse on demise of pensioner",link:"https://rodra.gov.in/ADVISORY%20TO%20SPOUSE%20ON%20DEMISE%20OF%20PENSIONER.pdf"},
    {name:"Video on 7th CPC documents upload process is available in video gallery.",link:""},
    {name:"Important informationn regarding smooth payment of Pension by Banks/PDAs",link:"https://rodra.gov.in/Circular-213.pdf"},
    {name:"Action by spouse on Demise of a Pensioner",link:"https://rodra.gov.in/Actionondemise%20Pensioner.pdf"}
  ]
  constructor(private iab: InAppBrowser) { }
  slideOpts = {
    initialSlide: 0,
    speed: 30,
    slidesPerView:3,
    effect:"fade",
    loop:true,
    direction:"vertical",
   autoplay: {
     delay: 3000,
    //pauseOnMouseEnter:true
  },
     };
  ngOnInit() {}
  openInBrowser(link){
    this.iab.create(link);
  }
}
