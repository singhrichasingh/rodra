import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, PopoverController } from '@ionic/angular';
import { AuthService } from 'src/app/auth.service';
import { PersonalMenuPopComponent } from '../personal-menu-pop/personal-menu-pop.component';

@Component({
  selector: 'app-future-visit',
  templateUrl: './future-visit.component.html',
  styleUrls: ['./future-visit.component.scss'],
})
export class FutureVisitComponent implements OnInit {
  scheduleList=[];
  scheduleListArray:any
  encryptMsg="*$96@!05%^64"
  constructor(private auth:AuthService,private router:Router,private popoverController:PopoverController,   private alertController: AlertController,) { }

  ngOnInit() {
    this.getScheduleList()
  }
  getScheduleList(){
    let personalNo=localStorage.getItem('personalNo')
    let body={
      "CreatedBy":personalNo,
      "FilterBy" :"5"
  }
    this.auth.getScheduleList(body).subscribe(res=>{
      //alert(res.length)
      this.scheduleListArray=res;
      console.log(JSON.stringify(this.scheduleListArray))
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
    this.presentAlertConfirm(id);
  }

  async presentAlertConfirm(id) {
    const alert = await this.alertController.create({
      header: 'Cancel Appointment',
      message: 'Are you sure you want to cancel appointment ?',
      buttons: [{
        text: 'No',
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blah) => { }
      }, {
        text: 'Yes',
        handler: () => {
          let body={
            "AppointmentID": id
          }
          this.auth.cancelAppointment(body).subscribe(res=>{
            // alert(JSON.stringify(res))
            // alert(res[0].Status)
            // alert(res.Message)
           if(res[0].Status==1){
            // alert(res[0].Message)
             this.getScheduleList();
           }
          })
          
        }
      }]
    });

    await alert.present();
  }

  reschedule(list){
    this.router.navigate(['/book'],{ queryParams: { id: list.AppointmentID ,from:'list',PurposeOfVisit: list.PurposeOfVisit,DateOfVisit:list.DateOfVisit,PreferTime:list.PreferTime,SlotID:list.SlotID,MobileNo:list.MobileNo,EmailID:list.EmailID} })
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
