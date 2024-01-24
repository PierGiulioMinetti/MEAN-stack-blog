import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BasicHttpService {

  constructor(private http:HttpClient) { }

  getData(url:string): Observable<any>{
    return this.http.get(url);
  }

  postData(url:string, body:{}): Observable<any>{
    return this.http.post(url, body);
  }

  putData(url:string, body:{}): Observable<any>{
    return this.http.get(url, body);
  }

  deleteData(url:string, id?:string | number): Observable<any>{
    return this.http.get(url);
  }
}
