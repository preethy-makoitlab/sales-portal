import { HttpClient } from '@angular/common/http';
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Observable, map } from 'rxjs';

@Pipe({
  name: 'secure'
})
export class SecurePipe implements PipeTransform {

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) { }

  transform(url:string): Observable<any> {
      return this.http.get(url||"", { responseType: 'blob' }).pipe(map((response: any) => this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(response))));
    
  }
}
