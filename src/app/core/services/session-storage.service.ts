import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  constructor() { }

  setVariable(key:string, object:string){
    if(!sessionStorage.getItem(key)){
      sessionStorage.setItem(key, object);
    }
  }

  getVariable(key:string){
    sessionStorage.getItem(key)
  }
}
