import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomepageRoutingModule } from './homepage-routing.module';
import { HomepageComponent } from './homepage.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from 'src/app/components/header/header.component';


@NgModule({
  declarations: [
    HomepageComponent,
  ],
  imports: [
    CommonModule,
    HomepageRoutingModule,
    HttpClientModule,
    HeaderComponent
  ]
})
export class HomepageModule { }
