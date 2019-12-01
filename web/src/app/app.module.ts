import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { LoginFormComponent } from './components/auth/login/login-form/login-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/auth/login/login.component';
import { PageNotFoundComponent } from './components/other/page-not-found/page-not-found.component';
import { HomeComponent } from './components/pages/home/home.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { HeaderComponent } from './components/main/header/header.component';
import { FooterComponent } from './components/main/footer/footer.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from './components/dialogs/confirmation-dialog/confirmation-dialog.component';
import { AccountComponent } from './components/pages/account/account.component';
import { EmailVerificationComponent } from './components/auth/email-verification/email-verification.component';
import { MatBadgeModule } from '@angular/material/badge';
import { ForgotPasswordComponent } from './components/auth/forgot-password/forgot-password.component';
import { MagicLoginComponent } from './components/auth/magic-login/magic-login.component';
import { TokenLoginComponent } from './components/auth/token-login/token-login.component';
import { PasswordResetComponent } from './components/auth/password-reset/password-reset.component';
import { PasswordDialogComponent } from './components/dialogs/password-dialog/password-dialog.component';
import { ChangeEmailComponent } from './components/pages/account/change-email/change-email.component';
import { ChangePasswordComponent } from './components/pages/account/change-password/change-password.component';
import { DeleteAccountComponent } from './components/pages/account/delete-account/delete-account.component';
import { NotesComponent } from './components/pages/notes/notes.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { LogOutSessionsComponent } from './components/pages/account/log-out-sessions/log-out-sessions.component';

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
    DeleteAccountComponent,
    NotesComponent,
    LogOutSessionsComponent
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
    MatBadgeModule,
    MatChipsModule,
    MatCheckboxModule
  ],
  entryComponents: [
    ConfirmationDialogComponent,
    PasswordDialogComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
