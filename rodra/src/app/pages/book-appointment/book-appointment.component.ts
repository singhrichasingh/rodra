import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-book-appointment',
  templateUrl: './book-appointment.component.html',
  styleUrls: ['./book-appointment.component.scss'],
})
export class BookAppointmentComponent implements OnInit {

  constructor() { }
  dobdate;
  profile;
  ngOnInit() {}
  profileChecked(e) {
    this.profile = e.currentTarget.value;
    if (this.profile == undefined) {
      console.log('you did not selected profile for')
    } else {
      console.log(this.profile);
    }
  }
}
