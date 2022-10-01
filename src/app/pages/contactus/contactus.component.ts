import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.scss'],
})
export class ContactusComponent implements OnInit {
  segmentModel = true;
  show="mp5";
  constructor(public viewCtrl: ModalController,private router:Router,public auth:AuthService) { }

  ngOnInit() {
    this.getOroContact()
    this.getMprsoContact()
  }
  getOroContact(){
    this.auth.getOroContact().subscribe(res=>{
      
      this.mp5oro=res;
    })
  }
  getMprsoContact(){
    this.auth.getMprsoContact().subscribe(res=>{
      //this.mp5oro=res;
      this.mprso=res;
    })
  }
  mprso:any
  //=
  // [
  //   {
  //     id:1,
  //     office:'Director (MPRS(O))',
  //     //address:"Directorate General Medical Services(Army) IHQ of MoD (Army) ‘L’ Block, MPRS(O), Room No-118(A) New Delhi-110001",
  //     address:"Directorate General Medical Services(Army) Integrated Headquarters if Ministry of Defence, New Defence Office Complex, KG Marg, Block 'A', 3rd Floor, Room No-334, New Delhi-110001",
  //     mail:'medical-feedback@nic.in',
  //     phone:'011-21411820'
  //   },
  //   {
  //     id:2,
  //     office:'Addl Offrs(MPRS(O))',
  //     //address:"Directorate General Medical Services(Army) IHQ of MoD (Army) ‘L’ Block, MPRS(O), Room No-118(A) New Delhi-110001 ",
  //     address:"Directorate General Medical Services(Army) Integrated Headquarters if Ministry of Defence, New Defence Office Complex, KG Marg, Block 'A', 3rd Floor, Room No-334, New Delhi-110001",
  //     mail:'medical-feedback@nic.in',
  //     phone:'011-21411820'
  //   },
  //   {
  //     id:3,
  //     office:'Veterans Helpline',
  //     //address:"Directorate General Medical Services(Army) IHQ of MoD (Army) ‘L’ Block, MPRS(O), Room No-118(A) New Delhi-110001",
  //     address:"Directorate General Medical Services(Army) Integrated Headquarters if Ministry of Defence, New Defence Office Complex, KG Marg, Block 'A', 3rd Floor, Room No-334, New Delhi-110001",
  //     mail:'medical-feedback@nic.in',
  //     phone:'011-21411820'
  //   },
  //   {
  //     id:4,
  //     office:'APACC',
  //     //address:"Army Pay & Allowances Contact Center (APACC) C/o PCDA (Officers) Golibar Maidan Pune - 411001 ",
  //     address:"Directorate General Medical Services(Army) Integrated Headquarters if Ministry of Defence, New Defence Office Complex, KG Marg, Block 'A', 3rd Floor, Room No-334, New Delhi-110001",
  //     mail:'medical-feedback@nic.in',
  //     phone:'011-21411820'
  //   },
  //   {
  //     id:5,
  //     office:'DPCC',
  //    // address:"Defence Pension Contact Center(DPCC) C/o PCDA (Pension) Draupadi Ghat, Near Sadar Bazar Allahabad (UP) - 211014",
  //    address:"Directorate General Medical Services(Army) Integrated Headquarters if Ministry of Defence, New Defence Office Complex, KG Marg, Block 'A', 3rd Floor, Room No-334, New Delhi-110001",
  //    mail:'medical-feedback@nic.in',
  //     phone:'011-21411820'
  //   }
  // ]
  mp5oro:any
  // =[
  //   {
  //     id:1,
  //     office:'Brig ORO',
  //     address:"Additional Directorate General Manpower Planning AG's Branch IHQ of MoD (Army) West Block-III, RK Puram New Delhi-110066",
  //     mail:'offr.record@gov.in',
  //     phone:'	011-20862656'
  //   },
  //   {
  //     id:2,
  //     office:'Sys Admin (ORO)',
  //     address:"Additional Directorate General Manpower Planning AG's Branch IHQ of MoD (Army) West Block-III, RK Puram New Delhi-110066 ",
  //     mail:'offr.record@gov.in',
  //     phone:'8368051743 (WhatsApp only)'
  //   },
  //   {
  //     id:3,
  //     office:'Veterans Helpline (MP-5B)',
  //     address:"Additional Directorate General Manpower Planning AG's Branch IHQ of MoD (Army) West Block-III, RK Puram New Delhi-110066",
  //     mail:'offr.record@gov.in',
  //     phone:'011 20863044,Mob-8130591689'
  //   },
  //   {
  //     id:4,
  //     office:'DAAG (Grievances)',
  //     address:"Additional Directorate General Manpower Planning AG's Branch IHQ of MoD (Army) West Block-III, RK Puram New Delhi-110066 ",
  //     mail:'offr.record@gov.in',
  //     phone:'8368051743 (WhatsApp only)'
  //   },
  //   {
  //     id:5,
  //     office:'APACC',
  //     address:"Army Pay & Allowances Contact Center (APACC) C/o PCDA (Officers) Golibar Maidan Pune - 411001",
  //     mail:'ramkc.56566@gov.in',
  //     phone:'Civil Tele No - 02026450691 (9373229967 WhatsApp only)'
  //   },
  //   {
  //     id:6,
  //     office:'DPCC',
  //     address:"Defence Pension Contact Center(DPCC) C/o PCDA (Pension) Draupadi Ghat, Near Sadar Bazar Allahabad (UP) - 211014 ",
  //     mail:'liaison.1986@gov.in',
  //     phone:'Landline/Fax - 0532 2420940'
  //   },
  // ]
  dismiss(){
    this.viewCtrl.dismiss();
  }
  
  showSlide(ev){
    let val= ev.target.value;
    this.show=val
    console.log(val);
  }
  backToHome(){
    this.router.navigate(['/home'])
  }
  
}
