import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LogService } from '../log/log.service';
import { environment } from '../../../environments/environment';
import { Note } from '../../models/note';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { retryWith } from '../../utils/auth.util';
import { StorageService } from '../storage/storage.service';

function url(endpoint: string): string {
  return `${environment.url.notes}/${endpoint}`;
}

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  auth: (req) => Observable<any>;
  headers = {};

  constructor(private http: HttpClient, private authService: AuthService, private log: LogService) {
    this.log.info('Authentication API url:', environment.url.auth);
    this.auth = retryWith(authService, log);
  }

  init() {
    return this.http.post(url(''), {}, {
      withCredentials: true
    }).pipe(
      tap((res: {token: string}) => {
        this.log.info(`Setting XSRF header: ${res.token}`);
        this.headers[environment.xsrf.header] = res.token;
      })
    );
  }

  list(): Observable<Note[]> {
    return this.auth(this.http.get(url('list'), {
      withCredentials: true
    }).pipe(
      map((res: any) => res.notes)
    ));
  }

  create(note: Partial<Note>): Observable<string> {
    return this.auth(this.http.post(url('create'), note, {
      headers: this.headers,
      withCredentials: true
    }).pipe(
      map((res: any) => res.id)
    ));
  }

  edit(note: Partial<Note>): Observable<void> {
    return this.auth(this.http.put(url('edit'), note, {
      headers: this.headers,
      withCredentials: true
    }));
  }

  delete(note: Partial<Note>): Observable<void> {
    return this.auth(this.http.delete(url(`delete/${note.id}`), {
      headers: this.headers,
      withCredentials: true
    }));
  }
}
