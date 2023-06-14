import { HttpClient, HttpEvent, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Inject, Injectable, Optional } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { CustomHttpUrlEncodingCodec } from '../components/encoder';
import { sendMessageToParent } from '../utils/utils';


@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  protected basePath = environment.serviceUrl;
  constructor(protected httpClient: HttpClient) { }

  public getCustomers(
    mobileNo?: string,
    observe: any = 'body',
    reportProgress: boolean = false
  ) {
    sendMessageToParent('getCustomers', {mobilenumber: mobileNo})
  }
}
