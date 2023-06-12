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

  public getAllOrders(
    mobileNo?: string,
    observe: any = 'body',
    reportProgress: boolean = false
  ) {
    // let queryParameters = new HttpParams({
    //   encoder: new CustomHttpUrlEncodingCodec(),
    // });
    console.log("in getallorders")
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

  public getCustomerOrders(
    customerGuid?: string,
    observe: any = 'body',
    reportProgress: boolean = false
  ) {
    sendMessageToParent('getCustomerOrders', {customerGuid: customerGuid})
  }

  public create(
    body?: Object,
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    let queryParameters = new HttpParams({
      encoder: new CustomHttpUrlEncodingCodec(),
    });
    
  
    return this.httpClient.request<Object>(
      'post',
      `${this.basePath}/orders`,
      {
        body: body,
        params: queryParameters,
        observe: observe,
        reportProgress: reportProgress,
      }
    );
  }

  public createOrder(
    customerGuid?: string,
    observe: any = 'body',
    reportProgress: boolean = false
  ) {
    sendMessageToParent('orderPhotobook', {customerGuid: customerGuid})
  }
}
