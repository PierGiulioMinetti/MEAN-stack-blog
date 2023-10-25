import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { authGuard as AuthGuard} from './core/guards/auth.guard'

const routes: Routes = [
{ path: '', component: LoginComponent },
{ path: 'homepage', loadChildren: () => import('./modules/homepage/homepage.module').then(m => m.HomepageModule), canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
