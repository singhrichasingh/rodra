/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable eqeqeq */
/* eslint-disable max-len */

import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ModalController, PopoverController } from '@ionic/angular';

import { AuthService } from 'src/app/auth.service';
import { DatePicker } from '@ionic-native/date-picker/ngx';
import { Ionic4DatepickerModalComponent } from '@logisticinfotech/ionic4-datepicker';
import { PersonalMenuPopComponent } from '../personal-menu-pop/personal-menu-pop.component';

const d = new Date();
const currentDate = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
const nextDate = (d.getFullYear() + 1) + '-12-31';
@Component({
  selector: 'app-book-appointment',
  templateUrl: './book-appointment.component.html',
  styleUrls: ['./book-appointment.component.scss'],
})
export class BookAppointmentComponent implements OnInit {
  appointmentDate: string = currentDate;
  timeSlot: any;
  purpose;
  date: string;
  mobile: any;
  mail: any;
  preferTime: any;
  min;
  dobdate;
  profile;
  max;
  today;
  fromNav: any;
  apponimentId: any;
  holidaysList: any;
  datePickerObj: any = {
    dateFormat: 'DD/MM/YYYY',
  };
  removeArr = [currentDate,
    '2022-01-01', '2022-01-02', '2022-01-08', '2022-01-09', '2022-01-15', '2022-01-16', '2022-01-22', '2022-01-23', '2022-01-26', '2022-01-29', '2022-01-30',
    '2022-02-05', '2022-02-06', '2022-02-12', '2022-02-13', '2022-02-19', '2022-02-20', '2022-02-26', '2022-02-27',
    '2022-03-05', '2022-03-06', '2022-03-12', '2022-03-13', '2022-03-19', '2022-03-20', '2022-03-26', '2022-03-27',
    '2022-04-02', '2022-04-03', '2022-04-09', '2022-04-10', '2022-04-14', '2022-04-15', '2022-04-16', '2022-04-17', '2022-04-23', '2022-04-24', '2022-04-30',
    '2022-05-01', '2022-05-03', '2022-05-07', '2022-05-08', '2022-05-14', '2022-05-15', '2022-05-16', '2022-05-21', '2022-05-22', '2022-05-28', '2022-05-29',
    '2022-06-04', '2022-06-05', '2022-06-11', '2022-06-12', '2022-06-18', '2022-06-19', '2022-06-25', '2022-06-26',
    '2022-07-02', '2022-07-03', '2022-07-09', '2022-07-10', '2022-07-16', '2022-07-17', '2022-07-23', '2022-07-24', '2022-07-30', '2022-07-31',
    '2022-08-06', '2022-08-07', '2022-08-09', '2022-08-13', '2022-08-14', '2022-08-15', '2022-08-20', '2022-08-21', '2022-08-27', '2022-08-28',
    '2022-09-03', '2022-09-04', '2022-09-10', '2022-09-11', '2022-09-17', '2022-09-18', '2022-09-24', '2022-09-25',
    '2022-10-01', '2022-10-02', '2022-10-05', '2022-10-08', '2022-10-09', '2022-10-15', '2022-10-16', '2022-10-22', '2022-10-23', '2022-10-24', '2022-10-29', '2022-10-30',
    '2022-11-05', '2022-11-06', '2022-11-08', '2022-11-12', '2022-11-13', '2022-11-19', '2022-11-20', '2022-11-26', '2022-11-27',
    '2022-12-03', '2022-12-04', '2022-12-10', '2022-12-11', '2022-12-16', '2022-12-18', '2022-12-24', '2022-12-25'
  ];
  appointmentData: any;

  constructor(public modalCtrl: ModalController, private router: Router, private datePicker: DatePicker, private auth: AuthService, private formBuilder: FormBuilder, private route: ActivatedRoute,
    private popoverController: PopoverController) {

    this.getHolidaysList();
    this.today = new Date();
    this.route.queryParams
      .subscribe(params => {
        console.log(params);
        if (params !== undefined) {
          this.fromNav = params.from;
          this.apponimentId = params.id;
          this.purpose=params.PurposeOfVisit
         this.appointmentDate=params.DateOfVisit
         this.date=params.DateOfVisit
          this.mobile=params.MobileNo
          this.mail=params.EmailID
        // console.log(this.date)
        }
      }
      );
  }

  ngOnInit() {
    setTimeout(() => {
      this.datePickerObj = {
        inputDate: new Date(), // default new Date()
        fromDate: new Date(), // default null
        toDate: new Date(nextDate), // default null
        showTodayButton: false, // default true
        closeOnSelect: true, // default false
        disabledDates: this.removeArr, // default []

        dateFormat: 'DD/MM/YYYY', // default DD MMM YYYY
      };
    }, 1000);
  }
  async openDatePicker() {
    console.log('Open Date PIcker');

    const modalCtrl = await this.modalCtrl.create({
      component: Ionic4DatepickerModalComponent,
      cssClass: 'li-ionic4-datePicker',
      componentProps: { objConfig: this.datePickerObj }
    });
    await modalCtrl.present();

    modalCtrl.onDidDismiss().then(data => {
      // this.isModalOpen = false;
      console.log(data.data.date);
      if (data.data.date !== 'Invalid date') {
        this.appointmentDate = data.data.date;
        this.date = this.appointmentDate.substring(3, 5) + '-' + this.appointmentDate.substring(0, 2) + '-' + this.appointmentDate.substring(6, 10);
        //alert(this.date)
      }
      else {
        alert('You Can\'t Select Today To Schedule Appointment');
      }

    });
  }
  selectSlot(e) {
    this.preferTime = '';
    this.timeSlot = e.currentTarget.value;
    console.log(this.timeSlot);
    if (this.timeSlot == 1) {
      this.min = '10:00';
      this.max = '11:00';
    }
    else if (this.timeSlot == 2) {
      this.min = '11:00';
      this.max = '12:00';
    }
    else if (this.timeSlot == 3) {
      this.min = '12:00';
      this.max = '13:00';
    }
    else if (this.timeSlot == 4) {
      this.min = '14:00';
      this.max = '15:00';
    }
    else if (this.timeSlot == 5) {
      this.min = '15:00';
      this.max = '16:00';
    }
    else {
      this.min = '16:00';
      this.max = '17:00';
    }
  }

  getHolidaysList() {
    this.auth.getHolidaysList().subscribe(res => {
      this.holidaysList = res;
      if (this.holidaysList.flag == 'true') {

      } console.log('list', JSON.stringify(this.holidaysList));

    });
  }
  showDatepicker() {
    //alert(this.today)
    this.datePicker.show({
      date: new Date(),
      mode: 'date',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK,
      okText: 'Save Date',
      todayText: 'Set Today',
      minDate: this.today,
    }).then(
      date => {
        const toCompare = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        if (this.today <= toCompare) {
          this.appointmentDate = date.getDate() + '/' + date.toLocaleString('default', { month: 'long' }) + '/' + date.getFullYear();
          this.date = (date.getMonth() + 1) + '-' + date.getDate() + '-' + date.getFullYear();
        }
        else {
          alert('Selected date should not be past date');
        }
      },
      err => console.log('Error occurred while getting date: ', err)
    );
  }
  submit() {
    const personalNo = localStorage.getItem('personalNo');
    if (this.validate()) {
      // alert(this.preferTime)
      const result = this.preferTime.indexOf('T');
      const time = this.preferTime.substring(result + 1, result + 6);
      //alert(time)
      if (this.validatePurpose()) {
        if (this.validateNo()) {
          if (this.validateMail()) {
            if (this.apponimentId == undefined) {

              const body = {
                PurposeOfVisit: this.purpose,
                DateOfVisit: this.date,
                PreferTime: time,
                SlotID: this.timeSlot,
                MobileNo: this.mobile,
                EmailID: this.mail,
                CreatedBy: personalNo
              };
              console.log(JSON.stringify(body));
              this.auth.scheduleAppointment(body).subscribe(res => {
                if (res.Status == 1) {
                  alert('Appointment Scheduled successfully');
                  this.router.navigate(['/scheduleListFuture']);
                }
                else {
                  alert('Appointment is not Scheduled');
                  this.purpose = '';
                  this.date = '';
                  this.preferTime = '';
                  //   this.timeSlot=0
                  this.mobile = '';
                  this.mail = '';
                }
              });
            }
            else {
              const body = {
                AppointmentID: this.apponimentId,
                PurposeOfVisit: this.purpose,
                DateOfVisit: this.date,
                PreferTime: time,
                SlotID: this.timeSlot,
                MobileNo: this.mobile,
                EmailID: this.mail,
                CreatedBy: personalNo
              };
              console.log(JSON.stringify(body));
              this.auth.rescheduleAppointment(body).subscribe(res => {
                if (res.Status == 1) {
                  alert('Appointment Rescheduled successfully');
                  this.router.navigate(['/scheduleListFuture']);
                }
                else {
                  alert('Appointment is not Rescheduled');
                  this.purpose = '';
                  this.preferTime = '';
                  this.mobile = '';
                  this.mail = '';
                }
              });
            }
          }
        }
      }
    }
  }

  moveFocus(nextElement) {

    nextElement.setFocus();
    
  }

  validatePurpose() {
    const regex = /^[^*|\":<>[\]{}`\\()';@&$]+$/;
    if (this.purpose.match(regex)) {
      // alert("No Special Character Allowed in Purpose of Visit");
      return true;
    }
    else {
      alert('No Special Character Allowed in Purpose of Visit');
      return false;
    }
  }
  validateNo() {

    const regex = /[0-9]+/g;
    if (this.mobile.match(regex)) {
      if (this.mobile.length < 10) {
        alert('Enter 10 digit mobile no.');
        return false;
      }
      //alert("Enter Valid Mobile No!");
      return true;
    }
    else {
      alert('You have entered an invalid mobile no!');
      return false;
    }
  }


  validateMail() {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (this.mail.match(regex)) {
      return true;
    }
    else {
      alert('You have entered an invalid email id!');
      return false;
    }
  }

  validate() {
    const x = new Date(this.today);
    const y = new Date(this.date);
    if (this.purpose == undefined || this.purpose == '') {
      alert('Please Enter Purpose of Visit');
    }
    else if (this.date == undefined || this.date == '') {
      alert('Please Select Date');
    }
    else if (this.preferTime == undefined || this.preferTime == '') {
      alert('Please Enter Preferred Time');
    }
    else if (this.timeSlot == undefined || this.timeSlot == 0) {
      alert('Please Select Time Slot');
    }
    else if (this.mobile == undefined || this.mobile == '') {
      alert('Please Enter Valid Mobile Number');
    }
    else if (this.mail == undefined || this.mail == '') {
      alert('Please Enter Email Id');
    }
    else {
      return true;
    }
  }


  scheduleForm = this.formBuilder.group({
    email: [
      '',
      [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$')
      ]
    ],
    phone: [
      '',
      [
        Validators.required,
        Validators.pattern('(0/91)?[0-9]{10}'),
      ]
    ],

  });


  async showMenu() {
    const popover = await this.popoverController.create({
      component: PersonalMenuPopComponent,
      cssClass: 'popInfo',
      //event: ev,
      translucent: true
    });
    await popover.present();
  }
  logout() {
   // localStorage.clear();
    alert('Successfully Sign Out');
    this.router.navigate(['/home']);
  }


}
