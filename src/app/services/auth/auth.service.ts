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
        catchError(this.getErrorHandler({
          statusCode: 401,
          errorMsg: 'Invalid credentials. Please try again.'
        })),
        tap((user: User) => this.user.set(user))
      );
  }

  register(body: { username: string; email: string; password: string }) {
    return this.http.post('/api/user/register', body)
      .pipe(
        catchError(this.getErrorHandler({
          statusCode: 409,
          errorMsg: 'A user with this email or username already exists.'
        }))
      );
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
        catchError(err => {
          this.log.error(err);
          return of(''); // return fallback value instead of throwing error so user is cleared
        }),
        tap(_ => this.user.clear())
      );
  }

  verifyEmail(token: string) {
    const options: {} = {
      responseType: 'text'
    };
    return this.http.put('/api/user/email/verify', {token}, options)
      .pipe(
        catchError(this.getErrorHandler({
          statusCode: 410,
          errorMsg: 'Your email is already verified.'
        }))
      );
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
    return this.http.put('/api/user/password/change', body, options)
      .pipe(
        catchError(this.getErrorHandler({
          statusCode: 400,
          errorMsg: 'Invalid password. Please try again.'
        }))
      );
  }

  forgotPassword(body: { email: string }) {
    const options: {} = {
      responseType: 'text'
    };
    return this.http.post('/api/user/password/reset/request', body, options);
  }

  private getErrorHandler(...errors: { statusCode: number; errorMsg: string }[]) {
    return function handleError(error: HttpErrorResponse) {
      const match = errors.find(err => err.statusCode === error.status);
      return throwError((match) ? match.errorMsg : 'Something went wrong; please try again later.');
    };
  }
}
