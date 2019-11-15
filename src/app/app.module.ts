import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { LoginFormComponent } from './components/login/login-form/login-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HomeComponent } from './components/home/home.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { RegisterComponent } from './components/register/register.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatDialogModule} from '@angular/material/dialog';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { AccountComponent } from './components/account/account.component';
import { EmailVerificationComponent } from './components/email-verification/email-verification.component';
import {MatBadgeModule} from '@angular/material/badge';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { MagicLoginComponent } from './components/magic-login/magic-login.component';
import { TokenLoginComponent } from './components/token-login/token-login.component';
import { PasswordResetComponent } from './components/password-reset/password-reset.component';
import { PasswordDialogComponent } from './components/password-dialog/password-dialog.component';
import { ChangeEmailComponent } from './components/account/change-email/change-email.component';
import { ChangePasswordComponent } from './components/account/change-password/change-password.component';
import { DeleteAccountComponent } from './components/account/delete-account/delete-account.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    LoginComponent,
    PageNotFoundComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    RegisterComponent,
    ConfirmationDialogComponent,
    AccountComponent,
    EmailVerificationComponent,
    ForgotPasswordComponent,
    MagicLoginComponent,
    TokenLoginComponent,
    PasswordResetComponent,
    PasswordDialogComponent,
    ChangeEmailComponent,
    ChangePasswordComponent,
    DeleteAccountComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatBadgeModule
  ],
  entryComponents: [
    ConfirmationDialogComponent,
    PasswordDialogComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
