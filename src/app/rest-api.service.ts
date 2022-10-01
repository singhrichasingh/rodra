/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable quote-props */

import { Http, HttpOptions } from '@capacitor-community/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { from } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class RestApiService {


    encryptMsg='*$96@!05%^64';
    constructor(public platform: Platform, public http: HttpClient) {

    }

    get(url) {

        const token =  localStorage.getItem('token');
      //  CryptoJS.AES.decrypt( localStorage.getItem('token').toString(),  this.encryptMsg.trim() ).toString(CryptoJS.enc.Utf8);

        if (this.platform.is('capacitor')) {
            const headers: any = {
                'Accept': '*/*',
                'Content-Type': '*/*'
            };
            if (token != null) {
                headers.Authorization = 'Bearer ' + token;
            }

            return from(Http.get({
                url: environment.url + url,
                headers
            })).pipe(
                map((res: any) => res.data));
        } else {
            let headers = new HttpHeaders().set('Accept', '*/*').set('Content-Type', '*/*');
            if (token != null) {
                headers = new HttpHeaders().set('Accept', '*/*').set('Content-Type', '*/*').set('Authorization', 'Bearer ' + token);
            }
            return this.http.get(environment.url + url, { headers });
        }
    }

    post(url, data = {}) {

        const token = localStorage.getItem('token');

        if (this.platform.is('capacitor')) {
            let headers: any = {
                'Accept': '*/*',
                'Content-Type': 'application/json'
            };
            if (token != null) {
                headers = {
                    'Accept': '*/*',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                };
            }

            return from(Http.post({
                url: environment.url + url,
                data,
                headers
            })).pipe(map((res: any) => {
                console.log(res);
                return res.data;
              }
            ));;
        } else {
            let headers = new HttpHeaders().set('Accept', '*/*').set('Content-Type', 'application/json');
            if (token != null) {
                headers = new HttpHeaders().set('Accept', '*/*').set('Content-Type', 'application/json').set('Authorization', 'Bearer ' + token);
            }
            return this.http.post(environment.url + url, data, { headers });
        }
    }

    uploadFile(url, data) {
        const token = localStorage.getItem('token');
        console.log(token);
        if (this.platform.is('capacitor')) {
            let headers: any = {
            };
            if (token != null) {
                headers = {
                    'Authorization': 'Bearer ' + token
                };
            }

            return from(Http.uploadFile({
                url: environment.url + url,
                filePath: data.filePath,
                name: data.name,
                headers
            })).pipe(map((res: any) => {
                console.log(res);
                return res.data;
            }
            ));;
        } else {
            let headers = new HttpHeaders().set('Accept', '*/*');
            if (token != null) {
                headers = new HttpHeaders().set('Accept', '*/*').set('Authorization', 'Bearer ' + token);
            }
            return this.http.post(environment.url + url, data, { headers });
        }
    }
    
}
