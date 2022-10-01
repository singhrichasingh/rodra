import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { AboutComponent } from './pages/about/about.component';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AskMeListComponent } from './pages/ask-me-list/ask-me-list.component';
import { AuthService } from './auth.service';
import { BasiclpcComponent } from './pages/basiclpc/basiclpc.component';
import { BookAppointmentComponent } from './pages/book-appointment/book-appointment.component';
import { BrowserModule } from '@angular/platform-browser';
import { ChangeMpinComponent } from './pages/change-mpin/change-mpin.component';
import { ChangePassComponent } from './pages/change-pass/change-pass.component';
import { CommonModule } from '@angular/common';
import { ContactusComponent } from './pages/contactus/contactus.component';
import { CreatempinComponent } from './pages/creatempin/creatempin.component';
import { DakStatusComponent } from './pages/dak-status/dak-status.component';
import { DatePicker } from '@ionic-native/date-picker/ngx';
import { DocumentViewer } from '@ionic-native/document-viewer/ngx';
import { DownloadsComponent } from './pages/downloads/downloads.component';
import { DownloadsecondComponent } from './pages/downloadsecond/downloadsecond.component';
import { EditprofileComponent } from './pages/editprofile/editprofile.component';
import { ExternalLinkComponent } from './pages/external-link/external-link.component';
import { FaqComponent } from './pages/faq/faq.component';
import { FeedbackComponent } from './pages/feedback/feedback.component';
import { FeedbackListComponent } from './pages/feedback-list/feedback-list.component';
import { File } from '@ionic-native/file/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { ForgotPassComponent } from './pages/forgot-pass/forgot-pass.component';
import { FutureVisitComponent } from './pages/future-visit/future-visit.component';
import { GrievancesComponent } from './pages/grievances/grievances.component';
import { HTTP } from '@ionic-native/http/ngx';
import { HttpClientModule } from '@angular/common/http';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Ionic4DatepickerModule } from '@logisticinfotech/ionic4-datepicker';
import { LoginComponent } from './pages/login/login.component';
import { LpcinvoiceComponent } from './pages/lpcinvoice/lpcinvoice.component';
import { NgModule } from '@angular/core';
import { NgOtpInputModule } from 'ng-otp-input';
//import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { OpenlpcComponent } from './pages/openlpc/openlpc.component';
import { PDFGenerator } from '@ionic-native/pdf-generator/ngx';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { PdfviewerComponent } from './pages/pdfviewer/pdfviewer.component';
import { PersonalInfoComponent } from './pages/personal-info/personal-info.component';
import { PersonalMenuPopComponent } from './pages/personal-menu-pop/personal-menu-pop.component';
import { PopmenuComponent } from './pages/popmenu/popmenu.component';
import { RegisterComponent } from './pages/register/register.component';
import { RouteReuseStrategy } from '@angular/router';
import { ScheduleListComponent } from './pages/schedule-list/schedule-list.component';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { SplashComponent } from './pages/splash/splash.component';
import { StatusComponent } from './pages/status/status.component';
import { UpdateaddressComponent } from './pages/updateaddress/updateaddress.component';
import { UpdatemailmobileComponent } from './pages/updatemailmobile/updatemailmobile.component';
import { UploaddataComponent } from './pages/uploaddata/uploaddata.component';
import { VideogalleryComponent } from './pages/videogallery/videogallery.component';
import { ViewnemsComponent } from './pages/viewnems/viewnems.component';
import { WhatsnewComponent } from './pages/whatsnew/whatsnew.component';
import { ForgotMpinComponent } from './pages/forgot-mpin/forgot-mpin.component';
import { CpcComponent } from './pages/cpc/cpc.component';

@NgModule({
  declarations: [AppComponent, SplashComponent,
    LoginComponent,
    CreatempinComponent,
    FaqComponent,
    PopmenuComponent,
    PersonalInfoComponent,
    ExternalLinkComponent,
    DownloadsComponent,
    WhatsnewComponent,
    VideogalleryComponent,
    AboutComponent,
    PersonalMenuPopComponent,
    ChangePassComponent,
    BookAppointmentComponent,
    RegisterComponent,
    StatusComponent,
    GrievancesComponent,
    DakStatusComponent,
    OpenlpcComponent,
    ViewnemsComponent,
    DownloadsecondComponent,
    UpdateaddressComponent,
    FeedbackComponent,
    ChangeMpinComponent,
    ScheduleListComponent,
    ContactusComponent,
    AskMeListComponent,
    FeedbackListComponent,
    ForgotPassComponent,
    BasiclpcComponent,
    FutureVisitComponent,
    UploaddataComponent,
    LpcinvoiceComponent,
    EditprofileComponent,
    UpdatemailmobileComponent,
    PdfviewerComponent,
    ForgotMpinComponent,
    CpcComponent
  ],
  entryComponents: [],
  imports: [
    BrowserModule, IonicModule.forRoot(), AppRoutingModule, NgOtpInputModule, HttpClientModule, FormsModule,
    ReactiveFormsModule, CommonModule, Ionic4DatepickerModule, Ng2SearchPipeModule,
    PdfViewerModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, AuthService, InAppBrowser, HTTP,
    DatePicker, File, FileTransfer, PDFGenerator, DocumentViewer, FileChooser, FilePath, FileOpener, SocialSharing,AndroidPermissions],
  bootstrap: [AppComponent],
})
export class AppModule { }
