import { HttpClient, HttpEvent, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Inject, Injectable, Optional } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomHttpUrlEncodingCodec } from '../common/encoder';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class InstructorService {

  protected basePath = environment.serviceUrl;
  constructor(protected httpClient: HttpClient) { }

  public instructorList(
    filter?: Object | null,
    page?: number,
    numberOfRecords?: number,
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    let queryParameters = new HttpParams({
      encoder: new CustomHttpUrlEncodingCodec(),
    });
    if(filter !== undefined) {
      queryParameters = queryParameters.set('filter', JSON.stringify(filter));
    }
    if (numberOfRecords !== undefined && numberOfRecords !== null) {
      queryParameters = queryParameters.set(
        'limit',
        <any>numberOfRecords
      );
    }
    if (page !== undefined && page !== null) {
      queryParameters = queryParameters.set('page', <any>page);
    } 
    
  
    return this.httpClient.request<Object>(
      'get',
      `${this.basePath}/instructors`,
      {
        params: queryParameters,
        observe: observe,
        reportProgress: reportProgress,
      }
    );
  }

}
