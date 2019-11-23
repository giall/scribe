import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../../models/user';
import { Observable, of, throwError } from 'rxjs';
import { LogService } from '../log/log.service';
import { url } from '../../utils/auth.util';
import { catchError, mergeMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private log: LogService) {
    this.log.info('Authentication API url:', environment.url.auth);
  }

  login(body: { email: string; password: string }) {
    return this.http.post(url('auth/login'), body, {
      withCredentials: true
    });
  }

  register(body: { username: string; email: string; password: string }) {
    return this.http.post(url('user/register'), body, {
      withCredentials: true
    });
  }

  refresh() {
    return this.http.post(url('auth/refresh'), {}, {
      withCredentials: true
    });
  }

  logout() {
    return this.http.post(url('auth/logout'), {}, {
      withCredentials: true
    });
  }

  invalidate() {
    return this.http.post(url('auth/invalidate'), {}, {
      withCredentials: true
    });
  }

  verifyEmail(token: string) {
    return this.http.put(url('user/email/verification'), { token }, {
      withCredentials: true
    });
  }

  changeEmail(body: { email: string; password: string }) {
    return this.auth(this.http.put(url('user/email/change'), body, {
      withCredentials: true
    }));
  }

  emailMagicLogin(body: { email: string }) {
    return this.http.post(url('auth/magic.login/request'), body, {
      withCredentials: true
    });
  }

  magicLogin(token: string): Observable<User> {
    return this.http.post(url('auth/magic.login'), { token }, {
      withCredentials: true
    }) as Observable<User>;
  }

  passwordChange(body: { oldPassword: string; newPassword: string }) {
    return this.auth(this.http.put(url('user/password/change'), body, {
      withCredentials: true
    }));
  }

  forgotPassword(body: { email: string }) {
    return this.http.post(url('user/password/reset/request'), body);
  }

  passwordReset(body: { newPassword: string; token: string }) {
    return this.http.put(url('user/password/reset'), body);
  }

  deleteUser(password: string) {
    return this.auth(this.http.put(url('user/delete'), { password }, {
      withCredentials: true
    }));
  }

  private auth(request: Observable<any>) {
    let success = false;
    return request.pipe(
      tap(_ => success = true),
      catchError(err => this.handleAuthError(err)), // refresh tokens if unauthorized
      mergeMap(res => success ? of(res) : request) // retry request if first attempt failed
    );
  }

  private handleAuthError(err) {
    if (err.status === 401) {
      this.log.info('Unauthorized request; attempting to refresh tokens...');
      return this.refresh();
    } else {
      return throwError(err);
    }
  }
}
