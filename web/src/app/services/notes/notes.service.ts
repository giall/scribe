import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LogService } from '../log/log.service';
import { environment } from '../../../environments/environment';
import { Note } from '../../models/note';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { retryWith, xsrf } from '../../utils/auth.util';

function url(endpoint: string): string {
  return `${environment.url.notes}/${endpoint}`;
}

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  auth: (req) => Observable<any>;

  constructor(private http: HttpClient, private authService: AuthService, private log: LogService) {
    this.log.info('Authentication API url:', environment.url.auth);
    this.auth = retryWith(authService, log);
  }

  init() {
    return this.http.get(url(''));
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
      headers: { ...this.xsrf() },
      withCredentials: true
    }).pipe(
      map((res: any) => res.id)
    ));
  }

  edit(note: Partial<Note>): Observable<void> {
    return this.auth(this.http.put(url('edit'), note, {
      headers: { ...this.xsrf() },
      withCredentials: true
    }));
  }

  delete(note: Partial<Note>): Observable<void> {
    return this.auth(this.http.delete(url(`delete/${note.id}`), {
      headers: { ...this.xsrf() },
      withCredentials: true
    }));
  }

  private xsrf() {
    return xsrf(document.cookie);
  }
}
