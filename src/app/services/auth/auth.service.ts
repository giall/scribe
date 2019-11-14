import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { LogService } from '../log/log.service';
import { UserStore } from 'src/app/stores/user/user.store';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private user: UserStore, private log: LogService) {
  }

  login(body: { email: string; password: string }) {
    return this.http.post('/api/auth/login', body)
      .pipe(
        tap((user: User) => this.user.set(user))
      );
  }

  register(body: { username: string; email: string; password: string }) {
    return this.http.post('/api/user/register', body);
  }

  refresh() {
    return this.http.post('/api/auth/refresh', {});
  }

  logout() {
    const options: {} = {
      responseType: 'text'
    };
    return this.http.post('/api/auth/logout', {}, options)
      .pipe(
        tap(_ => this.user.clear())
      );
  }

  verifyEmail(token: string) {
    const options: {} = {
      responseType: 'text'
    };
    return this.http.put('/api/user/email/verify', {token}, options);
  }

  emailMagicLogin(body: { email: string }) {
    const options: {} = {
      responseType: 'text'
    };
    return this.http.post('/api/auth/magic.login/request', body, options);
  }

  passwordChange(body: { oldPassword: string; newPassword: string }) {
    const options: {} = {
      responseType: 'text'
    };
    return this.http.put('/api/user/password/change', body, options);
  }

  forgotPassword(body: { email: string }) {
    const options: {} = {
      responseType: 'text'
    };
    return this.http.post('/api/user/password/reset/request', body, options);
  }

}
