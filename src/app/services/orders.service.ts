import { HttpClient, HttpEvent, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Inject, Injectable, Optional } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { CustomHttpUrlEncodingCodec } from '../components/encoder';
import { sendMessageToParent } from '../utils/utils';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  protected basePath = environment.serviceUrl;
  constructor(protected httpClient: HttpClient) { }

  public getOrdersList(
    mobileNo?: string,
    observe: any = 'body',
    reportProgress: boolean = false
  ) {
    // let queryParameters = new HttpParams({
    //   encoder: new CustomHttpUrlEncodingCodec(),
    // });

    sendMessageToParent('getInProgressOrders', {mobileNo: mobileNo})
    

    // return this.httpClient.request<Object>(
    //   'get',
    //   `${this.basePath}/orders`,
    //   {
    //     params: queryParameters,
    //     observe: observe,
    //     reportProgress: reportProgress,
    //   }
    // );
  }

  public createListener(
    body?: Object,
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    let queryParameters = new HttpParams({
      encoder: new CustomHttpUrlEncodingCodec(),
    });
    
  
    return this.httpClient.request<Object>(
      'post',
      `${this.basePath}/listeners`,
      {
        body: body,
        params: queryParameters,
        observe: observe,
        reportProgress: reportProgress,
      }
    );
  }

  public getListener(
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
      `${this.basePath}/listeners/${String(id)}`,
      {
        params: queryParameters,
        observe: observe,
        reportProgress: reportProgress,
      }
    );
  }

  public updateListener(
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
      `${this.basePath}/listeners/${String(id)}`,
      {
        body: body,
        // params: queryParameters,
        observe: observe,
        reportProgress: reportProgress,
      }
    );
  }

}
