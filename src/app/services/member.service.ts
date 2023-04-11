import { HttpClient, HttpEvent, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Inject, Injectable, Optional } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomHttpUrlEncodingCodec } from '../common/encoder';
import { environment } from '../../environments/environment.local';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  protected basePath = environment.serviceUrl;
  constructor(protected httpClient: HttpClient) { }

  public memberCount(
    partnerId?: String,
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
      `${this.basePath}/members/count/${partnerId}`,
      {
        params: queryParameters,
        observe: observe,
        reportProgress: reportProgress,
      }
    );
  }

  public memberList(
    partnerId: String,
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
      `${this.basePath}/members/${partnerId}`,
      {
        params: queryParameters,
        observe: observe,
        reportProgress: reportProgress,
      }
    );
  }

  public createMember(
    body?: Object,
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    let queryParameters = new HttpParams({
      encoder: new CustomHttpUrlEncodingCodec(),
    });
    
  
    return this.httpClient.request<Object>(
      'post',
      `${this.basePath}/members`,
      {
        body: body,
        params: queryParameters,
        observe: observe,
        reportProgress: reportProgress,
      }
    );
  }

  public getMember(
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
      `${this.basePath}/members/fetch/${String(id)}`,
      {
        params: queryParameters,
        observe: observe,
        reportProgress: reportProgress,
      }
    );
  }

  public updateMember(
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
      'patch',
      `${this.basePath}/members/${id}`,
      {
        body: body,
        params: queryParameters,
        observe: observe,
        reportProgress: reportProgress,
      }
    );
  }

  public bulkUpload(
    id:  String,
    file: Blob,
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    let queryParameters = new HttpParams({
      encoder: new CustomHttpUrlEncodingCodec(),
    });

    queryParameters = queryParameters.set('id',String(id));
    console.log(id, file);
  
    return this.httpClient.request<Object>(
      'post',
      `${this.basePath}/members/files/${String(id)}`,
      {
        body: file,
        headers: new HttpHeaders({
          'enctype': 'multipart/form-data'
        }),
        params: queryParameters,
        observe: observe,
        reportProgress: reportProgress,
      }
    );
  }

}
