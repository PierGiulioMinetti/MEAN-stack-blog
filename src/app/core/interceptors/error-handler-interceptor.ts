
import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from "rxjs";
import { catchError, map } from 'rxjs/operators';
import { Router } from "@angular/router";

@Injectable()
export class GlobalHttpInterceptorService implements HttpInterceptor {

  constructor(public router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(req).pipe(
      catchError((error) => {
        console.log('error is intercept')
        console.error('error first line by INTERCEPTOR', error);
        if (error instanceof HttpErrorResponse) {
          if (error.error instanceof ErrorEvent) {
            console.error("Error Event");
            console.log('error message', error.error.message);

          } else {
            console.log(`error status : ${error.status} ${error.statusText}`);
            switch (error.status) {
              case 401:      //401 Unauthorized
                // this.router.navigateByUrl("/login");
                console.log('401 - by interceptor');

                break;
                case 402:      //payment required
                // this.router.navigateByUrl("/login");
                console.log('402 - by interceptor');

                break;
              case 403:     //Forbidden
                // this.router.navigateByUrl("/unauthorized");
                console.log('403 - by interceptor');
                break;
                case 404:     //Not Found
                // this.router.navigateByUrl("/unauthorized");
                console.log('404 - by interceptor');
                break;
            }
          }
        } else {
          console.error("some thing else happened");
        }

        //Here we have access to the actual error message that we set in the backend
        console.log('whole error', error)
        console.log('error message that we set in the backend',error.error.message);
        console.log('message status',error.status);

        return throwError(error);
      })
    )
  }
}
