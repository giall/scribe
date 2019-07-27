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

  constructor(private http: HttpClient, private logger: LogService) { }

  login(options: { email: string; password: string }) {
    return this.http.post('/api/login', options)
      .pipe(
        catchError(this.handleLoginError.bind({ logger: this.logger }))
      );
  }

  register(options: { username: string; email: string; password: string }) {
    return this.http.post('/api/register', options)
      .pipe(
        catchError(this.handleRegisterError.bind({ logger: this.logger }))
      );
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

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something went wrong; please try again later.');
  };
}
