import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { LogService } from '../log/log.service';
import { UserStore } from 'src/app/stores/user/user.store';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  static DEFAULT_ERROR = 'Something went wrong; please try again later.';

  constructor(private http: HttpClient, private user: UserStore, private logger: LogService) { }

  login(body: { email: string; password: string }) {
    return this.http.post('/api/login', body)
      .pipe(
        catchError(this.handleLoginError.bind({ logger: this.logger })),
        tap(val => this.user.set(val))
      );
  }

  register(body: { username: string; email: string; password: string }) {
    return this.http.post('/api/register', body)
      .pipe(
        catchError(this.handleRegisterError.bind({ logger: this.logger }))
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

  private handleLoginError(error: HttpErrorResponse) {
    let errorMsg = AuthService.DEFAULT_ERROR;
    if (error.error instanceof ErrorEvent) {
      this.logger.error('An error occurred:', error.error.message);
    } else {
      if (error.status === 401) {
        errorMsg = 'Invalid credentials. Please try again.';
      }
    }
    return throwError(errorMsg);
  }

  private handleRegisterError(error: HttpErrorResponse) {
    let errorMsg = AuthService.DEFAULT_ERROR;
    if (error.error instanceof ErrorEvent) {
      this.logger.error('An error occurred:', error.error.message);
    } else {
      if (error.status === 409) {
        errorMsg = 'A user with this email or username already exists.';
      }
    }
    return throwError(errorMsg);
  }
}
