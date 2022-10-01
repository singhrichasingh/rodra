import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-feedback-list',
  templateUrl: './feedback-list.component.html',
  styleUrls: ['./feedback-list.component.scss'],
})
export class FeedbackListComponent implements OnInit {
  feedbacklist: any;

  constructor(private auth:AuthService) { }

  ngOnInit() {
    this.getfeedbackList()
  }
  getfeedbackList(){
    this.auth.getfeedbackList().subscribe(res=>{
       this.feedbacklist=res;
    })
  }
}
