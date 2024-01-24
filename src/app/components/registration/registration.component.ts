import { Component } from '@angular/core';
import { CommonModule, JsonPipe, NgIf } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { LoginService } from 'src/app/core/auth/login.service';
import { SessionStorageService } from 'src/app/core/services/session-storage.service';
import { Router, RouterModule } from '@angular/router';

import { ValidatorsPatternEnum } from 'src/app/core/enums/pattern-validators.enum';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { ToastComponent } from '../toast/toast.component';
import { HeaderComponent } from '../header/header.component';
import { SimpleInputComponent } from '../simple-input/simple-input.component';
import { matchPasswordValidator } from 'src/app/core/custom-validators/match-password.validators';
import { environment } from 'src/environments/environment.development';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
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
    RouterModule
  ]
})
export class RegistrationComponent {
  subs: Subscription;
  form!: FormGroup

  constructor(
    private loginService: LoginService,
    private sessionStorageService: SessionStorageService,
    private router: Router
  ) {
    //initialize the subscription to add inside(with add method) all the http call and then bulk unsubscribe in onDestroy
    this.subs = new Subscription();
    this.initializeForm();
  }

  ngOnInit(){
    console.log('api url',environment.baseUrl);

  }

  initializeForm(){
    this.form = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(5)]),
      email: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(20), Validators.email]),
      cf: new FormControl('', [Validators.required, Validators.pattern(ValidatorsPatternEnum.CF), Validators.minLength(16), Validators.maxLength(16)]),
      password: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]),
      passwordConfirm: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]),
    }, { validators: matchPasswordValidator });
  }

  get usernameControl(): AbstractControl<any, any> | null {
    return this.form.get('username');
  }

  get passwordControl(): AbstractControl<any, any> | null {
    return this.form.get('password');
  }

  onSubmit() {
    console.log('form submitted:---->', this.form.getRawValue());

    //SEND HTTP call to backend and check that the credentials are correct
    //user: mario
    // password: luigi
    // const credentials = {
    //   username: this.form.get('username')?.value,
    //   password: this.form.get('password')?.value,
    // };

    // if (credentials) {
    //   this.subs.add(
    //     this.loginService.login(credentials)
    //       .subscribe({
    //         // (res: LoginI) => {
    //         next: (res) => {
    //           console.log(res);
    //           if (res.token) {
    //             this.sessionStorageService.setVariable('token', res.token);
    //             this.sessionStorageService.jwtToken = res.token;
    //             this.loginService.isAuthenticated$.next(true);
    //             this.router.navigate(['/homepage']);
    //           } else {
    //             //create toast service that display with error
    //           }
    //         },
    //         error: (error: HttpErrorResponse) => {
    //           console.log('error inside submit----->',error);
    //           throw new Error(error.error);
    //         }
    //       }
    //       ),
    //   )
    // }
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
