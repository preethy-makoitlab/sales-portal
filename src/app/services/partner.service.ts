import { HttpClient, HttpEvent, HttpParams, HttpResponse } from '@angular/common/http';
import { Inject, Injectable, Optional } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomHttpUrlEncodingCodec } from '../common/encoder';
import { environment } from '../../environments/environment.local';

@Injectable({
  providedIn: 'root'
})
export class PartnerService {
  protected basePath = environment.serviceUrl;
  constructor(protected httpClient: HttpClient) { }

  public partnerCount(
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
      `${this.basePath}/partners/count`,
      {
        body: body,
        params: queryParameters,
        observe: observe,
        reportProgress: reportProgress,
      }
    );
  }

  public partnerList(
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
      `${this.basePath}/partners/getAll`,
      {
        body: body,
        params: queryParameters,
        observe: observe,
        reportProgress: reportProgress,
      }
    );
  }

  public createPartner(
    body?: Object,
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    let queryParameters = new HttpParams({
      encoder: new CustomHttpUrlEncodingCodec(),
    });
    
  
    return this.httpClient.request<Object>(
      'post',
      `${this.basePath}/partners`,
      {
        body: body,
        params: queryParameters,
        observe: observe,
        reportProgress: reportProgress,
      }
    );
  }

  public getPartner(
    id?:  Object,
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    let queryParameters = new HttpParams({
      encoder: new CustomHttpUrlEncodingCodec(),
    });
    
    console.log(queryParameters);
  
    return this.httpClient.request<Object>(
      'get',
      `${this.basePath}/partners/${String(id)}`,
      {
        params: queryParameters,
        observe: observe,
        reportProgress: reportProgress,
      }
    );
  }

  public updatePartner(
    id:  String,
    body?: Object,
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    let queryParameters = new HttpParams({
      encoder: new CustomHttpUrlEncodingCodec(),
    });

    queryParameters = queryParameters.set('id',String(id));

    console.log(id, body);
    
    return this.httpClient.request<Object>(
      'post',
      `${this.basePath}/partners/updateById/${id}`,
      {
        body: body,
        params: queryParameters,
        observe: observe,
        reportProgress: reportProgress,
      }
    );
  }

}
