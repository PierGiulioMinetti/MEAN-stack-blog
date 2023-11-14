import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AbstractControl, FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-simple-input',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  templateUrl: './simple-input.component.html',
  styleUrls: ['./simple-input.component.scss']
})
export class SimpleInputComponent {
  @Input() inputType!:string;
  @Input() inputLabel!:string;
  @Input() inputPlaceholder!:string;
  @Input() formControlReference!:any;

  constructor(){
    this.formControlReference as unknown as FormControl;
  }

  get formControlRef (){
    return this.formControlReference as FormControl;
  }

  log(event:Event){
    const value = (event.target as HTMLInputElement).value;
    console.log(value);

  }

}
