import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiConstants } from 'src/assets/constants/url';
import { ApiType } from '../models/constants';



@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  sendRequest(type: ApiType, severUrl:string, targetUrl: string, parameters?: any, body?: any, contentType?: any){
    let url = this.getUrl(severUrl, targetUrl, parameters);
    // type = type.toLowerCase();
    switch (type) {
      case 'get': {
        return this.http.get(url, { responseType: contentType == 'blob' ? contentType : 'text', observe: 'response' });
      }
      case 'post': {
        if (body) {
          return this.http.post(url, body, { responseType: 'text', observe: 'response' });
        } else {
          return this.http.post(url, { responseType: 'text', observe: 'response' });
        }
      }
      case 'put': {
        if (contentType) {
          return this.http.put(url, body, { headers: { 'Content-Type': contentType }, responseType: contentType, observe: 'response' });
        } else {
          return this.http.put(url, body, { responseType: 'text', observe: 'response' });
        }
      }
      case 'patch': {
        return this.http.patch(url, body, { responseType: 'text', observe: 'response' });
      }
      case 'delete': {
        return this.http.delete(url, { responseType: 'text', observe: 'response' });
      }
    }
    if (body) {
      return this.http.post(url, body, { responseType: 'text', observe: 'response' });
    } else {
      return this.http.post(url, { responseType: 'text', observe: 'response' });
    }
  }

  handleRequest(type: ApiType, severUrl: string, url: string, parameters?: any, body?: any, applicationType?: any, neglectError?: any, avoidLoader?: any): Promise<any> {
    return new Promise((resolve, reject) => {
      // if (!avoidLoader) {
      //   this.loader.queActions('push', url);
      // }
      this.sendRequest(type, severUrl, url, parameters, body, applicationType).subscribe((res: any) => {
        res && res.body && !this.isJsonString(res.body) ? res.body= JSON.stringify(res.body) : false
        if (applicationType == 'blob') resolve(res && res.body ? res.body : res);
        else resolve(res && res.body && JSON.parse(res.body) ? JSON.parse(res.body) : res);
        // if (!avoidLoader) {
        //   this.loader.queActions('pop', url);
        // }
      }, err => {
        // if (!avoidLoader) {
        //   this.loader.queActions('pop', url);
        // }
        reject(err);
      });
    
    })
  }

  isJsonString(str:string) {
    if(str){
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
  }
  return false;

  }

  getUrl(severUrl:string, target: string, params?: any) {
    let temp = target.split('_');
    console.log("TEST",temp);

    // let urlDetails = ApiConstants.url[temp[0]][temp[1]][target]  ;
    // let url = ApiConstants.url[temp[0]][severUrl] + urlDetails[0];
    let url = severUrl + '/' + target;
    if (params) {
      if (params.constructor === Array) {
        params.forEach((element, index) => {
          url = url.replace('{{param' + (index + 1) + '}}', element);
        });
      }
    }
    return url;
  }

}