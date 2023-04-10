import { HttpResponse, HttpEvent, HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CookieService } from "ngx-cookie-service";
import { environment } from 'src/environments/environment';
import { CustomResponse } from '../common/models/CustomResponse';
import { UserStateService } from '../State/User/userstate.service';
import { Router } from '@angular/router';
import { IsNullOrEmpty } from '../common/utils/utils';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  protected authPath = environment.serviceUrl2;

  public defaultHeaders = new HttpHeaders();
 

  constructor(private cookieService:CookieService,private httpClient:HttpClient ,private router:Router) { }

  public setUserId(user:string) {
    localStorage.setItem('zbxshjsn',user);
    // this.configuration.accessToken = JSON.parse(localStorage.getItem("currentUser")).token;
    // this.configuration.refreshToken = JSON.parse(localStorage.getItem("currentUser")).refreshToken;
    // this.configuration.accessToken = this.cookieService.get('accessToken'); 
    // this.configuration.refreshToken = this.cookieService.get('refreshToken'); 
    // console.log(this.configuration);
  }
  public getUserId() {
    return localStorage.getItem('zbxshjsn') ;
  }
  public clearUserData() {
    // remove user from local storage to log user out
        localStorage.clear();
        this.cookieService.deleteAll();      
        this.cookieService.delete('accessToken','/',window.location.hostname);
        this.cookieService.delete('refreshToken', '/',window.location.hostname);
        this.router.navigate(['']);


      
  }
   public selectHeaderAccept(accepts: string[]): string | undefined {
    
    if (accepts.length == 0) {
        return undefined;
    }
 
    let type = accepts.find(x => this.isJsonMime(x));
    if (type === undefined) {
        return accepts[0];
    }
    return type;
}


public isJsonMime(mime: string): boolean {
    const jsonMime: RegExp = new RegExp('^(application\/json|[^;/ \t]+\/[^;/ \t]+[+]json)[ \t]*(;.*)?$', 'i');
    return mime != null && (jsonMime.test(mime) || mime.toLowerCase() === 'application/json-patch+json');
}
    /**
     * 
     * 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public refreshToken( observe?: 'body', reportProgress?: boolean): Observable<CustomResponse>;
    public refreshToken( observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<CustomResponse>>;
    public refreshToken( observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<CustomResponse>>;
    public refreshToken( observe: any = 'body', reportProgress: boolean = false): Observable<any> {
  
        let headers = this.defaultHeaders;
        // authentication (bearerAuth) required
        let request:any = {refreshToken:null};
   request.refreshToken = this.cookieService.get('refreshToken').replace(/['"]+/g, '');;
      //    headers = headers.set('Authorization', 'Bearer ' + request.accessToken);
  
  
  
  console.log(request);
       if(!request.refreshToken) {
          console.log(request,"ELSE");
          throw new Error(
              'Required parameter refresh Token was null or undefined when calling refreshToken.'
            );
  
          //   return new Observable<CustomResponseString>(observer => observer.complete());
        }
      //    if (this.configuration.accessToken) {
  
      //        const accessToken = typeof this.configuration.accessToken === 'function'
      //            ? this.configuration.accessToken()
      //            : this.configuration.accessToken;
      //            const refreshToken = typeof this.configuration.refreshToken === 'function'
      //            ? this.configuration.refreshToken()
      //            : this.configuration.refreshToken;
              
      //         request.refreshToken = refreshToken;
      //         request.accessToken = accessToken;
              
      //         headers = headers.set('Authorization', 'Bearer ' + accessToken);
      //    }
  
      //    else {
      //     console.log(request,"ELSE");
  
      //       return new Observable<CustomResponseString>(observer => observer.complete());
      //   }
        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            '*/*'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
  
        // to determine the Content-Type header
        const consumes: string[] = [
        ];
  
        return this.httpClient.request<any>('post', `${this.authPath}/api/auth/refreshtoken`,
            {
                body:request,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        ); 
  
    }
      /**
     * 
     * 
     * @param app 
     * @param token 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
      public verifyToken(app: string,token: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
      public verifyToken(app: string,token: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
      public verifyToken(app: string,token: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
      public verifyToken(app: string,token: string, observe: any = 'body', reportProgress: boolean = false): Observable<any> {
  
          let headers = this.defaultHeaders;
          // authentication (bearerAuth) required
          if (!IsNullOrEmpty(token)) {

           // if (this.configuration.accessToken) {

           //     const accessToken = typeof this.configuration.accessToken === 'function'
           //         ? this.configuration.accessToken()
           //         : this.configuration.accessToken;
           //     headers = headers.set('Authorization', 'Bearer ' + accessToken);
           // }
           headers = headers.set('Authorization', 'Bearer ' + token);

          } else {
           throw new Error(
            'Required parameter  Token was null or undefined when calling verifyToken.'
            );
           //    return new Observable<CustomResponseString>(observer => observer.complete());

          }
          let request = {token:token,application:app}
         console.log(request);
          // to determine the Accept header
          let httpHeaderAccepts: string[] = [
              '*/*'
          ];
          const httpHeaderAcceptSelected: string | undefined = this.selectHeaderAccept(httpHeaderAccepts);
          if (httpHeaderAcceptSelected != undefined) {
              headers = headers.set('Accept', httpHeaderAcceptSelected);
          }
  
          // to determine the Content-Type header
          const consumes: string[] = [
          ];
  
          return this.httpClient.request<CustomResponse>('post', `${this.authPath}auth/token-validate`,
              {
                  headers: headers,
                  observe: observe,
                  body:request,
                  reportProgress: reportProgress
              }
          );
      }
}
