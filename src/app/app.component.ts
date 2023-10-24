import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BasicHttpService } from './core/services/basic-http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angularExpress';
  messageUrl = 'http://localhost:3000/message';
  birdsUrl = 'http://localhost:3000/birds';
  birdsAboutUrl = 'http://localhost:3000/birds/about';

  constructor(private basicHttpService: BasicHttpService){

  }

  ngOnInit(){
    // this.basicHttpService.loadData(this.messageUrl).subscribe(res=>console.log('res', res)
    // );

    // this.basicHttpService.loadData(this.birdsUrl).subscribe(res=>console.log('res', res)
    // );

    // this.basicHttpService.loadData(this.birdsAboutUrl).subscribe(res=>console.log('res', res)
    // );
  }


}
