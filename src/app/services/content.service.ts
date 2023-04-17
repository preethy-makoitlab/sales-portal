import { HttpClient, HttpEvent, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Inject, Injectable, Optional } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomHttpUrlEncodingCodec } from '../common/encoder';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ContentService {
  protected basePath = environment.serviceUrl;
  protected uploadBasePath = environment.contentServiceUrl;
  constructor(protected httpClient: HttpClient) { }

  public practiceNameCheck(
    body?:  string,
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    let queryParameters = new HttpParams({
      encoder: new CustomHttpUrlEncodingCodec(),
    });

    queryParameters = queryParameters.set('practiceName',String(body));

    
    return this.httpClient.request<Object>(
      'get',
      `${this.basePath}/contents/isValidPracticeName/${String(body)}`,
      {
        body: body,
        // params: queryParameters,
        observe: observe,
        reportProgress: reportProgress,
      }
    );
  }

  public uploadFile(
    id:string,
    category:string,
    index?:string,
    file?:  any,
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    let queryParameters = new HttpParams({
      encoder: new CustomHttpUrlEncodingCodec(),
    });
    
    console.log(queryParameters);
    queryParameters = queryParameters.set('index',String(index));

  
    return this.httpClient.request<Object>(
      'post',
      `${this.uploadBasePath}/files/upload/`+id+'/'+category,
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

  public createContent(
    body?: Object,
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    let queryParameters = new HttpParams({
      encoder: new CustomHttpUrlEncodingCodec(),
    });
    
  
    return this.httpClient.request<Object>(
      'post',
      `${this.basePath}/contents/create`,
      {
        body: body,
        params: queryParameters,
        observe: observe,
        reportProgress: reportProgress,
      }
    );
  }

}
