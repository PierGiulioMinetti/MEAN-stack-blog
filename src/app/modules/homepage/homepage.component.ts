import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { catchError, map, of } from 'rxjs';
import { BasicHttpService } from 'src/app/core/services/basic-http.service';
import * as PostsActions from '../../../app/state/posts/actions/posts.actions'

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent {

  constructor(
    private http: BasicHttpService,
    private store: Store
    ){

  }

  ngOnInit(){
    this.provaJwt();
console.log('chiamata');

    this.store.dispatch(PostsActions.fetchPost());
  }

  provaJwt(){
    this.http.getData('http://localhost:3000/message').subscribe((res)=>{
      console.log('res protected: ', res);
    });
  }

}
