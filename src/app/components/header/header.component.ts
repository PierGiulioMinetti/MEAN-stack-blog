import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SessionStorageService } from 'src/app/core/services/session-storage.service';
import { Subscription } from 'rxjs';
import { LoginService } from 'src/app/core/auth/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  token;
  subs: Subscription;

  constructor(
    private storageservice: SessionStorageService,
    private loginService: LoginService,
    private router: Router,

  ) {
    this.token = this.storageservice.getVariable('token');
    console.log('token login------>', this.token);
    this.subs = new Subscription();
  }

  logout() {
    this.subs.add(
      this.loginService.logout({}).subscribe((res) => {
        console.log('res logout', res);
        if (res) {
          this.loginService.isAuthenticated$.next(false);
          this.router.navigateByUrl('');
        }
      }
      )
    )
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}


