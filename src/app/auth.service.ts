import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RestApiService } from './rest-api.service';
import { tap } from 'rxjs/operators';

// import { HttpClient, HttpHeaders } from '@angular/common/http';




@Injectable({
  providedIn: 'root'
})
export class AuthService {
  text: any;
  userProfile;
  userData;
  dataOfTrackCaseWithId;
  lpcDetails;
  nemsInfo;
  constructor(private http: RestApiService) { }

  loginAdmin(body: any): Observable<any> {
    //alert("cgfcghvhj")
    return this.http.post('PensionRevision/ValidateUserLogin', body).pipe(
      tap((res) => {
        localStorage.setItem('token', res.token);
      }),
    );
  }


  getUserInfo(body: any): Observable<any> {
    return this.http.post('PensionRevision/GetUserInfo', body);
  }


  getDakStatus(body): Observable<any> {
    return this.http.post('UserActivity/CheckDaKStatus', body);
  }


  loginWithMpin(body): Observable<any> {
    return this.http.post('PensionRevision/ValidateUserMPIN', body);
  }

  getGrievanceList(): Observable<any> {
    return this.http.get('Master/GetGrievanceSubjects');
  }
  getOroContact(): Observable<any> {
    return this.http.get('UserActivity/GetOROContacts');
  }
  getMprsoContact(): Observable<any> {
    return this.http.get('UserActivity/GetMPRSOContacts');
  }
  getWhatsNew(): Observable<any> {
    return this.http.get('UserActivity/GetWhatsNew');
  }
  getEntryType(): Observable<any> {
    return this.http.get('Master/GetEntryTypeList');
  }
  getArmsServiceType(): Observable<any> {
    return this.http.get('Master/GetArmServiceList');
  }
  createMpin(body): Observable<any> {
    return this.http.post('PensionRevision/CreateUserMPIN', body);
  }
submitOtp(body):Observable<any>{
  return this.http.post('PensionRevision/VerifyOtpForUserRegistration', body);
  
}
  register(body): Observable<any> {
    return this.http.post('PensionRevision/UserRegistration', body);
  }

  changeUserMpin(body): Observable<any> {
    return this.http.post('PensionRevision/ChangeUserMPIN', body);
  }

  changePassword(body): Observable<any> {
    return this.http.post('PensionRevision/ChangeUserPassword', body);
  }

  getState(): Observable<any> {
    return this.http.get('Master/GetStateList');
  }

  getDistrict(val): Observable<any> {
    return this.http.get('Master/GetDistrictList?stateId=' + val);
  }

  getHolidaysList(): Observable<any> {
    return this.http.get('Master/GetHolidays');
  }

  getRelationsType(): Observable<any> {
    return this.http.get('Master/GetRelationships');
  }

  getFamilyPensionerType(): Observable<any> {
    return this.http.get('Master/GetFamilyPensionerType');
  }

  scheduleAppointment(body): Observable<any> {
    return this.http.post('Appointment/CreateNewAppointment', body);
  }

  getScheduleList(body): Observable<any> {
    return this.http.post('Appointment/GetAppointmentHistory', body);
  }

  cancelAppointment(body): Observable<any> {
    return this.http.post('Appointment/CancelAppointment', body);
  }

  rescheduleAppointment(body): Observable<any> {
    return this.http.post('Appointment/CreateNewAppointment', body);
  }

  sendFeedback(body): Observable<any> {
    return this.http.post('UserActivity/InsertNewFeedback', body);
  }

  getfeedbackList(): Observable<any> {
    return this.http.post('UserActivity/GetFeedbackList', {});
  }

  getOtpForForgotPass(body): Observable<any> {
    return this.http.post('PensionRevision/CheckForgotPassWord', body);
  }

  changeForgotPass(body): Observable<any> {
    return this.http.post('PensionRevision/ResetPassWord', body);
  }

  newGrievance(body): Observable<any> {
    return this.http.post('Grievance/AddNewGrievance', body);
  }

  getOtpForRegister(body): Observable<any> {
    return this.http.post('PensionRevision/CheckUserDuplication', body);
  }

  cpcStatus(body): Observable<any> {
    return this.http.post('UserActivity/Check7CPCEppoStatus', body);
  }

  exGratiaEppoStatus(body): Observable<any> {
    return this.http.post('UserActivity/CheckExGratiaEppoStatus', body);
  }

  updateAddress(body): Observable<any> {
    return this.http.post('UserActivity/UpdatedAddressInfo', body);
  }

  getUpdateAddress(body): Observable<any> {
    return this.http.post('UserActivity/GetUpdatedAddressInfo', body);
  }

  getGrievanceStatus(body): Observable<any> {
    return this.http.post('Grievance/GetGrievanceDetails', body);
  }

  editProfile(body): Observable<any> {
    return this.http.post('UserActivity/UpdateBasicDetail', body);
  }

  getdownloadDoc(): Observable<any> {
    return this.http.post('UserActivity/GetPreLoginDocuments', {});
  }

  getdownloadDocAfterLogin(body): Observable<any> {
    return this.http.post('UserActivity/GetPostLoginDocuments',body);
  }
  getDownloadsDocAfterLoginUserSpecific(body): Observable<any> {
    return this.http.post('UserActivity/GetDownloadFiles', body);
  }

  viewnems(body): Observable<any> {
    return this.http.post('UserActivity/GetNemsBCORPC', body);
  }

  getLpcDetails(body): Observable<any> {
    return this.http.post('UserActivity/GetLPCDetail', body);
  }

  trackCaseWithId(body): Observable<any> {
    return this.http.post('Grievance/GetGrievanceTrackDetails', body);
  }

  getOtpForMailChange(body): Observable<any> {
    return this.http.post('UserActivity/SendOTPForChangeEmail', body);
  }

  getOtpForMobileChange(body): Observable<any> {
    return this.http.post('UserActivity/SendOTPForChangeMobileNo', body);
  }

  changeMail(body): Observable<any> {
    return this.http.post('UserActivity/ChangeEmail', body);
  }

  changeMobileNo(body): Observable<any> {
    return this.http.post('UserActivity/ChangeMobileNo', body);
  }

  editLpcProfile(body): Observable<any> {
    return this.http.post('UserActivity/InsertUpdateLPC', body);
  }

  uploadDoc(body): Observable<any> {

    // const formData: FormData=new FormData();
    //           for(const key in body){
    //             console.log(key,body[key]);
    //             formData.append(key,body[key] );
    //           }
    return this.http.uploadFile('UserActivity/UploadDocumentFile', body);
  }
  getRankCode(){
    return this.http.get('Master/GetRankList');
  }
}
