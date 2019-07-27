import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LogService } from '../../services/log/log.service';

export enum Theme {
  Light = 'light',
  Dark = 'dark'
}

@Injectable({
  providedIn: 'root'
})
export class ConfigStore {

  theme: BehaviorSubject<Theme>;
  current: Theme;

  constructor(private logger: LogService) {
    this.current = Theme.Light;
    this.theme = new BehaviorSubject(this.current);
  }

  toggle() {
    this.current = (this.current === Theme.Light) ? Theme.Dark : Theme.Light;
    this.logger.info(`Changing theme to ${this.current}`);
    this.theme.next(this.current);
  }
}
