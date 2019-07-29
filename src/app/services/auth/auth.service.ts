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

  constructor(private http: HttpClient, private user: UserStore, private logger: LogService) { }

  login(body: { email: string; password: string }) {
    return this.http.post('/api/login', body)
      .pipe(
        catchError(this.getErrorHandler({
          statusCode: 401,
          errorMsg: 'Invalid credentials. Please try again.'
        })),
        tap((user: User) => this.user.set(user))
      );
  }

  register(body: { username: string; email: string; password: string }) {
    return this.http.post('/api/register', body)
      .pipe(
        catchError(this.getErrorHandler({
          statusCode: 409,
          errorMsg: 'A user with this email or username already exists.'
        }))
      );
  }

  tokenLogin() {
    return this.http.post('/api/tokenLogin', {});
  }

  logout() {
    const options: {} = {
      responseType: 'text'
    };
    return this.http.post('/api/logout', {}, options)
      .pipe(
        catchError(err => {
          console.error(err);
          return of(''); // return fallback value instead of throwing error so user is cleared
        }),
        tap(_ => this.user.clear())
      );
  }

  passwordChange(body: {oldPassword: string; newPassword: string}) {
    const options: {} = {
      responseType: 'text'
    };
    return this.http.put('/api/password/change', body, options)
      .pipe(
        catchError(this.getErrorHandler({
          statusCode: 400,
          errorMsg: 'Invalid password. Please try again.'
        }))
      );
  }

  private getErrorHandler(...errors: {statusCode: number; errorMsg: string}[]) {
    return function handleError(error: HttpErrorResponse) {
      const match = errors.find(err => err.statusCode === error.status);
      return throwError((match) ? match.errorMsg : 'Something went wrong; please try again later.');
    }
  }
}
