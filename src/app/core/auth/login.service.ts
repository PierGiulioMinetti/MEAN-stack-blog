import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ROUTES } from '../enums/route.enum';


@Injectable({
  providedIn: 'root'
})
export class LoginService {


  constructor(private http: HttpClient) { }

  login(body: {}):Observable<any>{
    return this.http.post(ROUTES.LOGIN, body);
  }
}
