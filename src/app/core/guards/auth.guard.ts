import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { SessionStorageService } from '../services/session-storage.service';
import { inject } from '@angular/core';
import { LoginService } from '../auth/login.service';
import { Observable, Subscription, map } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const loginService = inject(LoginService);
  const router = inject(Router);

  return loginService.isAuthenticated$ //observable
    .pipe(
      map((res) => {
        if (res === false) {
          router.navigateByUrl('');
          return false;
        } else {
          return true
        }
      })
    )
  };


  // METODO#2 (decommentare token e storageService)
  // if(!token){
  //   router.navigateByUrl('');
  //   return false;
  // } else {
  //   return true;
  // }
