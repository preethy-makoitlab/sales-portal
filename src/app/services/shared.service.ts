import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {  
  private dataMap: { [key: string]: Subject<any> } = {};

  // private totalOrders = new Subject<number>();
  // private totalOrderValue = new Subject<number>();
  // public totalOrders$ = this.totalOrders.asObservable();
  // public totalOrderValue$ = this.totalOrderValue.asObservable();

  getData<T>(variableName: string): Observable<T> {
    if (!this.dataMap[variableName]) {
      this.dataMap[variableName] = new Subject<T>();
    }
    return this.dataMap[variableName].asObservable();
  }

  setData<T>(variableName: string, value: T): void {
    if (!this.dataMap[variableName]) {
      this.dataMap[variableName] = new Subject<T>();
    }
    this.dataMap[variableName].next(value);
  }
}
