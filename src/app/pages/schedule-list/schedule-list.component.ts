import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { AuthService } from 'src/app/auth.service';
import { PersonalMenuPopComponent } from '../personal-menu-pop/personal-menu-pop.component';

@Component({
  selector: 'app-schedule-list',
  templateUrl: './schedule-list.component.html',
  styleUrls: ['./schedule-list.component.scss'],
})
export class ScheduleListComponent implements OnInit {
  scheduleList=[]
  scheduleListArray: any;

  constructor(private auth:AuthService,private router:Router,private popoverController:PopoverController) { }

  ngOnInit() {
    this.getScheduleList()
  }
  getScheduleList(){
    let personalNo=localStorage.getItem('personalNo')
    let body={
      "CreatedBy":personalNo,
      "FilterBy" :"6"
  }
    this.auth.getScheduleList(body).subscribe(res=>{
      //this.scheduleList=res;
      this.scheduleListArray=res;
      console.log(JSON.stringify(this.scheduleListArray[0]))
      for(let i=0;i<this.scheduleListArray.length;i++){
        let visitDate=this.scheduleListArray[i].DateOfVisit.substring(0,10)
      this.scheduleList[i]={
        AppointmentID:this.scheduleListArray[i].AppointmentID,
        ReferenceNo:this.scheduleListArray[i].ReferenceNo,
        MobileNo:this.scheduleListArray[i].MobileNo,
        EmailID:this.scheduleListArray[i].EmailID,
        PurposeOfVisit:this.scheduleListArray[i].PurposeOfVisit,
        StatusDesc:this.scheduleListArray[i].StatusDesc,
        DateOfVisit:visitDate,
        PreferTime:this.scheduleListArray[i].PreferTime
      }
      }
    })
  }
  cancelAppointment(id){
    let body={
      "AppointmentID": id
    }
    this.auth.cancelAppointment(body).subscribe(res=>{
      // alert(JSON.stringify(res))
      // alert(res[0].Status)
      // alert(res.Message)
     if(res[0].Status==1){
       alert(res[0].Message)
       this.getScheduleList();
     }
    })
  }
  reschedule(id){
    this.router.navigate(['/book'],{ queryParams: { id: id ,from:'list'} })
    //rescheduleAppointment(body)
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
    //localStorage.clear();
    this.router.navigate(['/home'])
  }
}
