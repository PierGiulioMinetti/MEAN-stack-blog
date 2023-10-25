import { CanActivateFn } from '@angular/router';
// import { SessionStorageService } from '../services/session-storage.service'

export const authGuard: CanActivateFn = (route, state) => {
  const token = sessionStorage.getItem('token');
  if(token){
    console.log('AUTH GUARD WORKING!');

    return true;
  } else {
    return false;
  }
};
