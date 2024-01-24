import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ROUTES } from '../enums/route.enum';
import { SessionStorageService } from '../services/session-storage.service';
import { environment } from 'src/environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  isAuthenticated$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private http: HttpClient,
    private storage: SessionStorageService
    ) {
  }

  ngOnInit(){
    this.storage.getVariable('token')?.length ? this.isAuthenticated$.next(true) : this.isAuthenticated$.next(false);
  }

  login(body: {}):Observable<any>{
    return this.http.post(environment.baseUrl + ROUTES.LOGIN, body);
  }

  logout(body: {}){
      sessionStorage.clear();
      this.isAuthenticated$.next(false);
      return this.http.post(environment.baseUrl + ROUTES.LOGOUT, body);
  }

}
