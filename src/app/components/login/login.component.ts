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
import { catchError, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule, NgIf, ReactiveFormsModule, MatButtonModule, MatDividerModule, MatIconModule, JsonPipe],
})
export class LoginComponent {

  form: FormGroup
  constructor(
    private loginService: LoginService,
    private sessionStorageService: SessionStorageService
  ) {
    this.form = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(12), Validators.maxLength(20)])
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
      this.loginService.login(credentials)
        .subscribe(
          (res: LoginI) => {
            console.log(res);
            if (res.token) {
              this.sessionStorageService.setVariable('token', res.token)
            }
          }),
        (error: HttpErrorResponse) => {
          // Handle the error response
          // console.error('Error:', error.statusText);
          // console.error('Error:', error.status);
          throw error;


        }
    }
  }
}
