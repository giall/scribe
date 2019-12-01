import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LogService } from '../log/log.service';
import { environment } from '../../../environments/environment';
import { Note } from '../../models/note';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  constructor(private http: HttpClient, private log: LogService) {
    this.log.info('Authentication API url:', environment.url.auth);
  }

  list(): Observable<Note[]> {
    return this.http.get(this.url('/list'), {
      withCredentials: true
    }).pipe(
      map((res: any) => res.notes)
    ) as Observable<Note[]>;
  }

  private url(endpoint: string): string {
    return `${environment.url.notes}/${endpoint}`;
  }
}
