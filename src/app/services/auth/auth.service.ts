import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { UserStore } from 'src/app/stores/user/user.store';
import { User } from '../../models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private options: {} = {
    responseType: 'text'
  };

  constructor(private http: HttpClient, private user: UserStore) {
  }

  login(body: { email: string; password: string }): Observable<User> {
    return this.http.post('/api/auth/login', body) as Observable<User>;
  }

  register(body: { username: string; email: string; password: string }) {
    return this.http.post('/api/user/register', body);
  }

  refresh() {
    return this.http.post('/api/auth/refresh', {});
  }

  logout() {
    return this.http.post('/api/auth/logout', {}, this.options)
      .pipe(
        tap(_ => this.user.clear())
      );
  }

  verifyEmail(token: string) {
    return this.http.put('/api/user/email/verify', {token}, this.options);
  }

  changeEmail(body: { email: string; password: string }) {
    return this.http.put('/api/user/email/change', body, this.options);
  }

  emailMagicLogin(body: { email: string }) {
    return this.http.post('/api/auth/magic.login/request', body, this.options);
  }

  magicLogin(token: string): Observable<User> {
    return this.http.post('/api/auth/magic.login', {token}) as Observable<User>;
  }

  passwordChange(body: { oldPassword: string; newPassword: string }) {
    return this.http.put('/api/user/password/change', body, this.options);
  }

  forgotPassword(body: { email: string }) {
    return this.http.post('/api/user/password/reset/request', body, this.options);
  }

  passwordReset(body: { newPassword: string; token: string }) {
    return this.http.put('/api/user/password/reset', body, this.options);
  }

}
