import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, ObservableInput, catchError, of, throwError } from 'rxjs';
import { CookieService } from "ngx-cookie-service";
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private cookie:CookieService,private auth:AuthenticationService) {}
  
   handleHttpError(err: any, caught: Observable<any>): ObservableInput<any> {
    // Handle the error here, for example by logging an error message or returning a default value
    console.error(err);
    return of([]);
  }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = this.cookie.get("accessToken").replace(/['"]+/g, '');


    if (token && !request.url.includes('refresh')) {
      // If we have a token, we set it to the header
      request = request.clone({
         setHeaders: {Authorization: `Bearer ${token}`, 'Access-Control-Allow-Origin': '*'}
      });
   }
  
      return next.handle(request).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {      
            this.auth.refreshToken().subscribe({
              next:(res)=>{
               let data = JSON.parse(JSON.stringify( res));
               this.cookie.delete('accessToken','/',window.location.hostname);
               this.cookie.delete('refreshToken', '/',window.location.hostname);
               this.cookie.set('accessToken',JSON.stringify(data?.accessToken),{domain:window.location.hostname,path:'/'});
               this.cookie.set('refreshToken',JSON.stringify(data?.refreshToken),{domain:window.location.hostname,path:'/'});
                 return next.handle(this.addToken(request,data?.accessToken));
              },
              error:(err) =>{
                // this.session.clearStorage();
                return throwError(()=>err);

             
              }
            } );
              
          } 
            return throwError(()=>error);
          
        })
      );
    }

    private addToken(request: HttpRequest<any>, token: string) {
      return request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
  }

