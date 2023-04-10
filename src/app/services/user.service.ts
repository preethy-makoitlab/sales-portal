import { HttpClient, HttpEvent, HttpParams, HttpResponse } from '@angular/common/http';
import { Inject, Injectable, Optional } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CustomHttpUrlEncodingCodec } from '../common/encoder';




@Injectable({
  providedIn: 'root'
})
export class UserService {
  protected basePath = environment.serviceUrl;
  constructor(
    protected httpClient: HttpClient
  ) { }


    /**
   * @param consumes string[] mime-types
   * @return true: consumes contains 'multipart/form-data', false: otherwise
   */
    private canConsumeForm(consumes: string[]): boolean {
      const form = 'multipart/form-data';
      for (const consume of consumes) {
        if (form === consume) {
          return true;
        }
      }
      return false;
    }

   

public listUsers(
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
    'post',
    `${this.basePath}/api/v1/user/list`,
    {
      body: body,
      params: queryParameters,
      observe: observe,
      reportProgress: reportProgress,
    }
  );
}


}
