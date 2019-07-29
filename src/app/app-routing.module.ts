import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { environment } from 'src/environments/environment';
import { RegisterComponent } from './components/register/register.component';
import { GuestGuard } from './guards/guest/guest.guard';
import { AccountComponent } from './components/account/account.component';
import { UserGuard } from './guards/user/user.guard';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent, canActivate: [GuestGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [GuestGuard] },
  { path: 'account', component: AccountComponent, canActivate: [UserGuard] },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes,
      // { enableTracing: !environment.production }
    )
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }