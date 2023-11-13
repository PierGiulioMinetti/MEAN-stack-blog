import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

type jwt = string | null;

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {
  jwtToken!: BehaviorSubject<jwt>;
  constructor() {
  }

  ngOnInit(){
    this.jwtToken.next(null)
  }

  setVariable(key:string, object:string){
    if(!sessionStorage.getItem(key)){
      sessionStorage.setItem(key, object);
    }
  }

  getVariable(key:string){
   return sessionStorage.getItem(key)
  }

  clearStorage(){
    sessionStorage.clear();
  }
}
