import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-ask-me-list',
  templateUrl: './ask-me-list.component.html',
  styleUrls: ['./ask-me-list.component.scss'],
})
export class AskMeListComponent implements OnInit {
  @Input() textVal: any;
  text;
  constructor(public viewCtrl: ModalController) { 
   
  }

  ngOnInit() {
    this.text="text"+this.textVal
    console.log(this.text)
  }
  dismiss(){
    this.viewCtrl.dismiss();
    }

}
