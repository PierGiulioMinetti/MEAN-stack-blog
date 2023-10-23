import { Component } from '@angular/core';
import {FormControl, Validators, FormsModule, ReactiveFormsModule, FormGroup} from '@angular/forms';
import {NgIf} from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule, NgIf, ReactiveFormsModule, MatButtonModule, MatDividerModule, MatIconModule],
})
export class LoginComponent {

  form:FormGroup
  constructor(){
    this.form = new FormGroup({
      username : new FormControl('', [Validators.required]),
      password : new FormControl('', [Validators.required, Validators.minLength(12), Validators.maxLength(20)])
    })
  }

  // getErrorMessage(control:FormControl) {
  //   if (this.form.get(control)?.value.hasError('required')) {
  //     return 'You must enter a value';
  //   }

  //   return this.form.get('password')?.value.hasError('username') ? 'Not a valid username' : '';
  // }

  get username(){
    return this.form.get('username');
  }

  get password(){
    return this.form.get('password');
  }

  onSubmit(){
    console.log('form values:', this.form.getRawValue());

  }
}
