import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LogService } from '../../services/log/log.service';
import { Theme } from 'src/app/models/theme';

@Injectable({
  providedIn: 'root'
})
export class ConfigStore {

  current: BehaviorSubject<Theme>;

  constructor(private log: LogService) {
    this.current = new BehaviorSubject(Theme.Light);
  }

  get theme(): Observable<Theme> {
    return this.current.asObservable();
  }

  toggle() {
    const theme = (this.current.getValue() === Theme.Light) ? Theme.Dark : Theme.Light;
    this.log.info(`Changing theme to ${theme}`);
    this.current.next(theme);
  }
}
