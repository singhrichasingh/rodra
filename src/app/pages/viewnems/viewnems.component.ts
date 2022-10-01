import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { initialize } from '@ionic/core';
import { AuthService } from 'src/app/auth.service';
import { PersonalMenuPopComponent } from '../personal-menu-pop/personal-menu-pop.component';

@Component({
  selector: 'app-viewnems',
  templateUrl: './viewnems.component.html',
  styleUrls: ['./viewnems.component.scss'],
})
export class ViewnemsComponent implements OnInit {
   name;
   secTrench;
  data;
  nemsInfo: any;
  constructor(private router:Router,private route: ActivatedRoute,private popoverController:PopoverController,private auth:AuthService) {
    this.nemsInfo=  this.auth.nemsInfo
    console.log("rty")
    this.initializeTable()
    console.log(JSON.stringify(this.nemsInfo))
    this.route.queryParams.subscribe(params => {
      if (params && params.userDetail) {
        this.data =(params.userDetail);
      }
    });
   }

  ngOnInit() {
    
   // this.viewNems()
  }
  viewNems(){
    let personalNo=localStorage.getItem('personalNo')
    let body={
      "Pin" :personalNo
  }
    this.auth.viewnems(body).subscribe(res=>{
      alert(JSON.stringify(res))
this.nemsInfo=res[0]

    })
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
    alert("Successfully Sign Out")
   // localStorage.clear();
    this.router.navigate(['/home'])
  }

  initializeTable(){
    this.name=[
      {
      name:'Funeral Allowance',
      amount:this.nemsInfo.funeral_allce,
      paid:this.nemsInfo.funeral_dt,
      remark:this.nemsInfo.fnrl_rmk
    },
    {
      name:'1st Trench',
      amount:this.nemsInfo.ist_trench,
      paid:this.nemsInfo.ist_trench_dt,
      remark:this.nemsInfo.ist_trnch_rmk
    },
    {
      name:'AWWA Grant',
      amount:this.nemsInfo.awwa_grant,
      paid:this.nemsInfo.awwa_grant_dt,
      remark:this.nemsInfo.awwa_grant_rmk
    },
    {
      name:'FSA Credit Balance',
      amount:this.nemsInfo.fsa_cr_bal,
      paid:this.nemsInfo.fsa_cr_bal_dt,
      remark:this.nemsInfo.fsa_cr_rmk
    },
     {
      name:'DSOP Fund',
      amount:this.nemsInfo.provident_fund,
      paid:this.nemsInfo.provident_fund_dt,
      remark:this.nemsInfo.dsop_fund_rmk
    },
    {
      name:'DCRG',
      amount:this.nemsInfo.dcrg_amt,
      paid:this.nemsInfo.dcrg_amt_dt,
      remark:this.nemsInfo.dcrg_rmk
    },
    {
      name:'Leave Encashment',
      amount:this.nemsInfo.lve_encash_amt,
      paid:this.nemsInfo.lve_encash_amt_dt,
      remark:this.nemsInfo.lve_encash_rmk
    },
    {
      name:'AGIF Death Cover',
      amount:this.nemsInfo.agif_death_cover,
      paid:this.nemsInfo.agif_death_cover_dt,
      remark:this.nemsInfo.agi_maturity_rmk
    },
    {
      name:'AGIF Maturity',
      amount:this.nemsInfo.agif_maturity,
      paid:this.nemsInfo.agif_maturity_dt,
      remark:this.nemsInfo.agi_maturity_rmk
    },
    {
      name:'DLIS',
      amount:this.nemsInfo.dlis_amt,
      paid:this.nemsInfo.dlis_recd_dt,
      remark:this.nemsInfo.dlis_rmk
    },
  ]

  this.secTrench=[
    {
      name:'2nd Trench',
      appli:this.nemsInfo.iind_trnch_appl,
      amount:this.nemsInfo.iind_trench,
      paid:this.nemsInfo.iind_trench_dt,
    },
    {
      name:'Ex-gratia Central',
      appli:this.nemsInfo.ex_gratia_central_appl,
      amount:this.nemsInfo.ex_gratia_central,
      paid:this.nemsInfo.ex_gratia_central_dt,
    },
    {
      name:'Ex-gratia home state',
      appli:this.nemsInfo.ex_gratia_home_appl,
      amount:this.nemsInfo.ex_gratia_home,
      paid:this.nemsInfo.ex_gratia_home_dt,
    },
    {
      name:'Ex-gratia J&K',
      appli:this.nemsInfo.ex_gratia_jk_appl,
      amount:this.nemsInfo.ex_gratia_jk,
      paid:this.nemsInfo.ex_gratia_jk_dt,
    },
    {
      name:'Name of Gallantry Award',
      appli:this.nemsInfo.gal_name,
      amount:this.nemsInfo.gal_amt,
      paid:this.nemsInfo.gal_dt1,
    },
  ]
  
  }
 

}
