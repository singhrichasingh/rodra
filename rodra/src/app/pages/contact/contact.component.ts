import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  @Input() text: any;
  segmentModel = true;
  constructor(public viewCtrl: ModalController,private router:Router) { 
   // this.segmentModel = true;
  }
  show=true
  ngOnInit() {}
  dismiss(){
    this.viewCtrl.dismiss();
  }
  showSlide(ev){
    let val= ev.target.value;
    if(val=="mp5"){
      this.show=true
    }
    else{
     this.show=false
    }
    console.log(val);
    
    //console.log(event);
  }
  backToHome(){
    this.router.navigate(['/home'])
  }
  mp:any=[
    {
      id:1,
      office:'Director (MPRS(O))',
      address:"Additional Directorate General Manpower Planning AG's Branch IHQ of MoD (Army) West Block-III, RK Puram New Delhi-110066",
      mail:'medical-feedback@nic.in',
      phone:'011 23093312'
    },
    {
      id:2,
      office:'Addl Offrs(MPRS(O))',
      address:"Directorate General Medical Services(Army) IHQ of MoD (Army) ‘L’ Block, MPRS(O), Room No-118(A) New Delhi-110001 ",
      mail:'medical-feedback@nic.in',
      phone:'8948986999(WhatsApp only)'
    },
    {
      id:3,
      office:'Director (MPRS(O))',
      address:"Additional Directorate General Manpower Planning AG's Branch IHQ of MoD (Army) West Block-III, RK Puram New Delhi-110066",
      mail:'medical-feedback@nic.in',
      phone:'011 23093312'
    },
    {
      id:4,
      office:'Addl Offrs(MPRS(O))',
      address:"Directorate General Medical Services(Army) IHQ of MoD (Army) ‘L’ Block, MPRS(O), Room No-118(A) New Delhi-110001 ",
      mail:'medical-feedback@nic.in',
      phone:'8948986999(WhatsApp only)'
    },
    {
      id:5,
      office:'Director (MPRS(O))',
      address:"Additional Directorate General Manpower Planning AG's Branch IHQ of MoD (Army) West Block-III, RK Puram New Delhi-110066",
      mail:'medical-feedback@nic.in',
      phone:'011 23093312'
    },
    {
      id:6,
      office:'Addl Offrs(MPRS(O))',
      address:"Directorate General Medical Services(Army) IHQ of MoD (Army) ‘L’ Block, MPRS(O), Room No-118(A) New Delhi-110001 ",
      mail:'medical-feedback@nic.in',
      phone:'8948986999(WhatsApp only)'
    },
  ]
  mp5:any=[
    {
      id:1,
      office:'Brig ORO',
      address:"Additional Directorate General Manpower Planning AG's Branch IHQ of MoD (Army) West Block-III, RK Puram New Delhi-110066",
      mail:'offr.record@gov.in',
      phone:'	011-20862656'
    },
    {
      id:2,
      office:'Sys Admin (MP 5&6)',
      address:"Additional Directorate General Manpower Planning AG's Branch IHQ of MoD (Army) West Block-III, RK Puram New Delhi-110066 ",
      mail:'medical-feedback@nic.in',
      phone:'8368051743 (WhatsApp only)'
    },
    {
      id:3,
      office:'Veterans Helpline (MP-5B)',
      address:"Additional Directorate General Manpower Planning AG's Branch IHQ of MoD (Army) West Block-III, RK Puram New Delhi-110066",
      mail:'medical-feedback@nic.in',
      phone:'011 20863044,Mob-8130591689'
    },
    {
      id:4,
      office:'DAAG (Grievances)',
      address:"Directorate General Medical Services(Army) IHQ of MoD (Army) ‘L’ Block, MPRS(O), Room No-118(A) New Delhi-110001 ",
      mail:'medical-feedback@nic.in',
      phone:'8368051743 (WhatsApp only)'
    },
    {
      id:5,
      office:'APACC',
      address:"Army Pay & Allowances Contact Center (APACC) C/o PCDA (Officers) Golibar Maidan Pune - 411001",
      mail:'ramkc.56566@gov.in',
      phone:'Civil Tele No - 02026450691 (9373229967 WhatsApp only)'
    },
    {
      id:6,
      office:'DPCC',
      address:"Defence Pension Contact Center(DPCC) C/o PCDA (Pension) Draupadi Ghat, Near Sadar Bazar Allahabad (UP) - 211014 ",
      mail:'liaison.1986@gov.in',
      phone:'Landline/Fax - 0532 2420940'
    },
  ]
}
