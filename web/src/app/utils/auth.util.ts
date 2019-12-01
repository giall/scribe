import { environment } from '../../environments/environment';
import { Observable, of, throwError } from 'rxjs';
import { catchError, mergeMap, tap } from 'rxjs/operators';
import { LogService } from '../services/log/log.service';
import { AuthService } from '../services/auth/auth.service';

function url(endpoint: string) {
  return `${environment.url.auth}/${endpoint}`;
}

function retryWith(authService: AuthService, logService: LogService) {
  function handleAuthError(err) {
    if (err.status === 401) {
      logService.info('Unauthorized request; attempting to refresh tokens...');
      return authService.refresh();
    } else {
      return throwError(err);
    }
  }
  return function retryable(request: Observable<any>) {
    let success = false;
    return request.pipe(
      tap(_ => success = true),
      catchError(err => handleAuthError(err)), // refresh tokens if unauthorized
      mergeMap(res => success ? of(res) : request) // retry request if first attempt failed
    );
  };
}

export { retryWith, url };
