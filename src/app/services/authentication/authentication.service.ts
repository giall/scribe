import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LogService } from '../log/log.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  static DEFAULT_ERROR = 'Something went wrong; please try again later.';

  options = {
    // withCredentials: true
  }

  constructor(private http: HttpClient, private logger: LogService) { }

  login(body: { email: string; password: string }) {
    return this.http.post('/api/login', body, this.options)
      .pipe(
        catchError(this.handleLoginError.bind({ logger: this.logger }))
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
    return this.http.post('/api/logout', {}, {
      responseType: 'text'
    });
  }

  private handleLoginError(error: HttpErrorResponse) {
    let errorMsg = AuthenticationService.DEFAULT_ERROR;
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
    let errorMsg = AuthenticationService.DEFAULT_ERROR;
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
