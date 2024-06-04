import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParentService {

  constructor(private http: HttpClient) { }


  post(requestUrl: string, data: any,headers?:HttpHeaders): Observable<any> {
    const href: string = `${requestUrl}`;
    return this.http.post<any>(href, data,{headers});
  }
}
