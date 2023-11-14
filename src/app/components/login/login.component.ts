import { Component } from '@angular/core';
import { FormControl, Validators, FormsModule, ReactiveFormsModule, FormGroup, AbstractControl } from '@angular/forms';
import { JsonPipe, NgIf } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { LoginService } from 'src/app/core/auth/login.service';
import { LoginI } from './login-interface';
import { SessionStorageService } from 'src/app/core/services/session-storage.service';
import { Subscription, catchError, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastComponent } from "../toast/toast.component";
import { HeaderComponent } from '../header/header.component';
import { SimpleInputComponent } from '../simple-input/simple-input.component';
import { ValidatorsPatternEnum } from 'src/app/core/enum/pattern-validators.enum';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    JsonPipe,
    NgIf,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    ToastComponent,
    HeaderComponent,
    SimpleInputComponent,
  ]
})
export class LoginComponent {
  subs: Subscription;
  form: FormGroup

  constructor(
    private loginService: LoginService,
    private sessionStorageService: SessionStorageService,
    private router: Router
  ) {
    //initialize the subscription to add inside(with add method) all the http call and then bulk unsubscribe in onDestroy
    this.subs = new Subscription();

    this.form = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(5)]),
      email: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(20), Validators.email]),
      cf: new FormControl('', [Validators.pattern(ValidatorsPatternEnum.CF), Validators.minLength(8), Validators.maxLength(20)]),
      password: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(5)])
    })
  }


  get usernameControl(): AbstractControl<any, any> | null {
    return this.form.get('username');
  }

  get passwordControl(): AbstractControl<any, any> | null {
    return this.form.get('password');
  }

  onSubmit() {
    console.log('form valid:', this.form.valid);
    //SEND HTTP call to backend and check that the credentials are correct
    //user: mario
    // password: luigi
    const credentials = {
      username: this.form.get('username')?.value,
      password: this.form.get('password')?.value,
    };

    if (credentials) {
      this.subs.add(
        this.loginService.login(credentials)
          .subscribe({
            // (res: LoginI) => {
            next: (res) => {
              console.log(res);
              if (res.token) {
                this.sessionStorageService.setVariable('token', res.token);
                this.sessionStorageService.jwtToken = res.token;
                this.loginService.isAuthenticated$.next(true);
                this.router.navigate(['/homepage']);
              } else {
                //create toast service that display with error
              }
            },
            error: (error: HttpErrorResponse) => {
              console.log('error inside submit----->',error);
              throw new Error(error.error);
            }
          }
          ),
      )
    }
  }

  logout() {
    this.subs.add(
      this.loginService.logout({}).subscribe((res) => {
        console.log('res logout', res);
        this.sessionStorageService.clearStorage();
        this.loginService.isAuthenticated$.next(false);
        this.router.navigateByUrl('');
    }
      )
    )
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
