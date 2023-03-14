import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VideoserviceService {

  constructor(private http: HttpClient) { }

  getVideoUrl(id: string) {
    return of(`http://localhost:3000/contents/${id}`);
  }

}
