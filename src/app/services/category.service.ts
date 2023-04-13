import { HttpClient, HttpEvent, HttpParams, HttpResponse } from '@angular/common/http';
import { Inject, Injectable, Optional } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomHttpUrlEncodingCodec } from '../common/encoder';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  protected basePath = environment.serviceUrl;
  constructor(protected httpClient: HttpClient) { }

  public getCategory(
    body?: Object,
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
      `${this.basePath}/categories`,
      {
        body: body,
        params: queryParameters,
        observe: observe,
        reportProgress: reportProgress,
      }
    );
  }


}
