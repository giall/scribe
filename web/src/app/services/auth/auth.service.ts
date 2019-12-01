import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

import { HttpClient } from '@angular/common/http';
import { User } from '../../models/user';
import { Observable } from 'rxjs';
import { LogService } from '../log/log.service';
import { retryWith, url } from '../../utils/auth.util';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  auth: (req) => Observable<any>;

  constructor(private http: HttpClient, private log: LogService) {
    this.log.info('Authentication API url:', environment.url.auth);
    this.auth = retryWith(this, log);
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
}
