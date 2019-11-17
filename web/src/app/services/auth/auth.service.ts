import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';

import {HttpClient} from '@angular/common/http';
import {User} from '../../models/user';
import {Observable} from 'rxjs';
import {LogService} from '../log/log.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private options: {} = {
    responseType: 'text'
  };

  constructor(private http: HttpClient, private log: LogService) {
    this.log.info('Authentication API url:', environment.url.auth);
  }

  login(body: { email: string; password: string }): Observable<User> {
    return this.http.post(this.url('auth/login'), body) as Observable<User>;
  }

  register(body: { username: string; email: string; password: string }) {
    return this.http.post(this.url('user/register'), body);
  }

  refresh() {
    return this.http.post(this.url('auth/refresh'), {});
  }

  logout() {
    return this.http.post(this.url('auth/logout'), {}, this.options);
  }

  verifyEmail(token: string) {
    return this.http.put(this.url('user/email/verification'), {token}, this.options);
  }

  changeEmail(body: { email: string; password: string }) {
    return this.http.put(this.url('user/email/change'), body, this.options);
  }

  emailMagicLogin(body: { email: string }) {
    return this.http.post(this.url('auth/magic.login/request'), body, this.options);
  }

  magicLogin(token: string): Observable<User> {
    return this.http.post(this.url('auth/magic.login'), {token}) as Observable<User>;
  }

  passwordChange(body: { oldPassword: string; newPassword: string }) {
    return this.http.put(this.url('user/password/change'), body, this.options);
  }

  forgotPassword(body: { email: string }) {
    return this.http.post(this.url('user/password/reset/request'), body, this.options);
  }

  passwordReset(body: { newPassword: string; token: string }) {
    return this.http.put(this.url('user/password/reset'), body, this.options);
  }

  deleteUser(password: string) {
    return this.http.put(this.url('user/delete'), {password}, this.options);
  }

  private url(endpoint: string) {
    return `${environment.url.auth}/${endpoint}`;
  }

}
