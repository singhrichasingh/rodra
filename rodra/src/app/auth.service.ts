import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HTTP } from '@ionic-native/http/ngx';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 url="http://103.1.82.29:807/api/"
 userProfile;
  constructor(private http: HttpClient,private http1:HTTP) { }


  loginAdmin(body: any) {
    let headers = new HttpHeaders();
  // headers.append('Content-Type', 'application/json ');
  this.http1.setDataSerializer('json');
    //this.http1.setHeader("Accept", "application/json");
    //this.http1.setHeader("Content-Type", "application/json");
  //  return this.http.post(this.url + 'PensionRevision/ValidateUserLogin', body, { headers: headers }
  //  ).pipe(
  //    tap((res) => {
  //     // this.token = localStorage.setItem('token', res.token);
  //      //console.log(res);
  //    }),
  //  );
 return this.http1.post(this.url + 'PensionRevision/ValidateUserLogin', body, {  }).then(
    res=>{
     this.userProfile= res;
      //console.log(JSON.stringify(res.data));
    }
  )
    
 }
//  loginAdmin(body: any): Observable<any> {
//   let headers = new HttpHeaders();
//  headers.append('Content-Type', 'application/json ');
//  return this.http.post("http://103.1.82.29:803/api/PensionRevision/Login?userName=IC31807&userPassword=Abc@1234", { headers: headers }
//  ).pipe(
//    tap((res) => {
//     // this.token = localStorage.setItem('token', res.token);
//      console.log(res);
//    }),
//  );
// }
}
