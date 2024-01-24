import type { HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { SessionStorageService } from '../services/session-storage.service';
import { Observable } from 'rxjs';

// export const authRequestsInterceptor: HttpInterceptorFn = (req, next) => {

//   const storageService = inject(SessionStorageService);
//   const token = storageService.getVariable('token');

//   if (token?.length) {
//     const clonedRequest = req.clone({
//       setHeaders: { Authorization: 'Bearer ' + token }
//     });
//     return next(clonedRequest);
//   } else {
//     return next(req);
//   }
// };

@Injectable()
export class authRequestsInterceptor implements HttpInterceptor {
  token!: string | null;

  constructor(
    private storageService: SessionStorageService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.token = this.storageService.getVariable('token');

    if (this.token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.token}`,
        },
      });
    }

    return next.handle(request);
  }
}
