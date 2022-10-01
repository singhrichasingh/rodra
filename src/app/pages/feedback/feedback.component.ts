import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { AuthService } from 'src/app/auth.service';
import { PersonalMenuPopComponent } from '../personal-menu-pop/personal-menu-pop.component';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss'],
})
export class FeedbackComponent implements OnInit {
  comments;
  grade;
  toShow;
  constructor(private auth:AuthService,private popoverController:PopoverController, private router:Router) { }

  ngOnInit() {}
  sendFeedback(){
    let personalNo=localStorage.getItem('personalNo') 
    if(this.comments!=undefined||this.comments!=""){
      this.validatePurpose();
    }
    if(this.grade!=undefined){
   let body= {
      "UserId": personalNo,                
      "Grade": this.grade,
      "Comments" : this.comments
  }
 
  this.auth.sendFeedback(body).subscribe(res=>{
    if(res.Status==1){
      alert(res.Message)
      this.router.navigate(['/personalInfo'])
    }
    else{
    this.comments=""
    //this.grade=undefined
      alert("Feedback Not Submitted")
    }
  })
}
else{
  alert("Please Click Emoji For Feedback")
}
  }

  validatePurpose(){
    let regex = /^[^*|\":<>[\]{}`\\()';@&$]+$/
    if(this.comments.match(regex))
    {
     // alert("No Special Character Allowed in Purpose of Visit");
      return true;
    }
    else
    {
   alert("No Special Character Allowed in Feedback");
    return false;
    }
   }

  selectedEmoji(ev,val){
    //ev.currentTarget.add('.selectStyle')
   if(val==1){
     this.grade="Very Poor"
     this.toShow=1
   }
  else if(val==2){
    this.grade="Poor"
    this.toShow=2
  }
  else if(val==3){
    this.grade="Average"
    this.toShow=3
  }
  else if(val==4){
    this.grade="Good"
    this.toShow=4
  }
  else{
    this.grade="Excellent"
    this.toShow=5
  }
  //alert(this.grade)
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
