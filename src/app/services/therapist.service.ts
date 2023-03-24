import { HttpClient, HttpEvent, HttpParams, HttpResponse } from '@angular/common/http';
import { Inject, Injectable, Optional } from '@angular/core';
// import { EmailRequest, LoginRequest, OtpRequest, ResetPasswordRequest } from 'app/models/common-models';
import { Observable } from 'rxjs';
import { CustomHttpUrlEncodingCodec } from '../common/encoder';
import { environment } from '../../environments/environment.local';

@Injectable({
  providedIn: 'root'
})
export class TherapistService {
  protected basePath = environment.serviceUrl;
  constructor(protected httpClient: HttpClient) { }

  public therapistCount(
    body?: Object ,
    observe: any = 'body',
    numberOfRecords?: number,
    page?: number,
    reportProgress: boolean = false
  ): Observable<any> {
    let queryParameters = new HttpParams({
      encoder: new CustomHttpUrlEncodingCodec(),
    });
    if (numberOfRecords !== undefined && numberOfRecords !== null) {
      queryParameters = queryParameters.set(
        'numberOfRecords',
        <any>numberOfRecords
      );
    }
    if (page !== undefined && page !== null) {
      queryParameters = queryParameters.set('page', <any>page);
    } 
  
    return this.httpClient.request<Object>(
      'get',
      `${this.basePath}/therapists/count`,
      {
        body: body,
        params: queryParameters,
        observe: observe,
        reportProgress: reportProgress,
      }
    );
  }

  public therapistList(
    body?: Object ,
    observe: any = 'body',
    numberOfRecords?: number,
    page?: number,
    reportProgress: boolean = false
  ): Observable<any> {
    let queryParameters = new HttpParams({
      encoder: new CustomHttpUrlEncodingCodec(),
    });
    if (numberOfRecords !== undefined && numberOfRecords !== null) {
      queryParameters = queryParameters.set(
        'numberOfRecords',
        <any>numberOfRecords
      );
    }
    if (page !== undefined && page !== null) {
      queryParameters = queryParameters.set('page', <any>page);
    } 
  
    return this.httpClient.request<Object>(
      'get',
      `${this.basePath}/therapists`,
      {
        body: body,
        params: queryParameters,
        observe: observe,
        reportProgress: reportProgress,
      }
    );
  }

  public createTherapist(
    body?: Object,
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    let queryParameters = new HttpParams({
      encoder: new CustomHttpUrlEncodingCodec(),
    });
    
  
    return this.httpClient.request<Object>(
      'post',
      `${this.basePath}/therapists`,
      {
        body: body,
        params: queryParameters,
        observe: observe,
        reportProgress: reportProgress,
      }
    );
  }

  public getTherapist(
    body?:  Object,
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    let queryParameters = new HttpParams({
      encoder: new CustomHttpUrlEncodingCodec(),
    });
    
    console.log(queryParameters);
  
    return this.httpClient.request<Object>(
      'get',
      `${this.basePath}/therapists/{id}`,
      {
        body: body,
        params: queryParameters,
        observe: observe,
        reportProgress: reportProgress,
      }
    );
  }
  
}
