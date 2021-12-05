import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss'],
})
export class StatusComponent implements OnInit {

  constructor() { }
   toShow=true;
  ngOnInit() {}
  show(ev){
    let val=ev.target.value;
   if(val=="status"){
    this.toShow=true;
   }
   else{
    this.toShow=false;
   }
  }
}
