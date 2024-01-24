import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import { GlobalHttpInterceptorService } from './core/interceptors/error-handler-interceptor';
import { authRequestsInterceptor } from './core/interceptors/authRequests.interceptor';
import { environment } from 'src/environments/environment.development';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
  ],
  providers: [
    // { provide: HTTP_INTERCEPTORS, useClass: GlobalHttpInterceptorService, multi: true  },
    { provide: HTTP_INTERCEPTORS, useClass: authRequestsInterceptor, multi: true  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
