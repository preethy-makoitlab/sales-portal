import { HttpClient, HttpEvent, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Inject, Injectable, Optional } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomHttpUrlEncodingCodec } from '../common/encoder';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoutineService {

  protected basePath = environment.serviceUrl;
  protected uploadBasePath = environment.contentServiceUrl;
  constructor(protected httpClient: HttpClient) { }

  public createRoutine(
    body?: Object,
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    let queryParameters = new HttpParams({
      encoder: new CustomHttpUrlEncodingCodec(),
    });
    
  
    return this.httpClient.request<Object>(
      'post',
      `${this.basePath}/routines`,
      {
        body: body,
        params: queryParameters,
        observe: observe,
        reportProgress: reportProgress,
      }
    );
  }

  public routineNameCheck(
    body?:  string,
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    let queryParameters = new HttpParams({
      encoder: new CustomHttpUrlEncodingCodec(),
    });

    queryParameters = queryParameters.set('routineName',String(body));

    
    return this.httpClient.request<Object>(
      'get',
      `${this.basePath}/routines/isValidRoutineName/${String(body)}`,
      {
        body: body,
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
      `${this.uploadBasePath}/files/upload/`+category+'/'+id,
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

  public fetchPracticeName(
    filter?:  any,
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    let queryParameters = new HttpParams({
      encoder: new CustomHttpUrlEncodingCodec(),
    });
    if(filter){
      queryParameters = queryParameters.set('filter',JSON.stringify( filter));
    }
    console.log(filter);
    
    return this.httpClient.request<Object>(
      'get',
      `${this.basePath}/routines/fetchPracticeName`,
      {
         params:queryParameters,
        observe: observe,
        reportProgress: reportProgress,
      }
    );
  }

}
