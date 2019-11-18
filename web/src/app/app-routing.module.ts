import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { HomeComponent } from './components/pages/home/home.component';
import { PageNotFoundComponent } from './components/other/page-not-found/page-not-found.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { GuestGuard } from './guards/guest/guest.guard';
import { AccountComponent } from './components/pages/account/account.component';
import { UserGuard } from './guards/user/user.guard';
import { EmailVerificationComponent } from './components/auth/email-verification/email-verification.component';
import { MagicLoginComponent } from './components/auth/magic-login/magic-login.component';
import { ForgotPasswordComponent } from './components/auth/forgot-password/forgot-password.component';
import { PasswordResetComponent } from './components/auth/password-reset/password-reset.component';
import { TokenLoginComponent } from './components/auth/token-login/token-login.component';
import { NotesComponent } from './components/pages/notes/notes.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'notes', component: NotesComponent },
  { path: 'login', component: LoginComponent, canActivate: [GuestGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [GuestGuard] },
  { path: 'account', component: AccountComponent, canActivate: [UserGuard] },
  { path: 'verify', component: EmailVerificationComponent },
  { path: 'magic-login', component: MagicLoginComponent },
  { path: 'token-login', component: TokenLoginComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'password-reset', component: PasswordResetComponent },
  { path: 'home', redirectTo: '', pathMatch: 'full' },
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
export class AppRoutingModule {
}
