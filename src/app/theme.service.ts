import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export enum Theme {
  Light = 'light',
  Dark = 'dark'
}

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  theme: BehaviorSubject<Theme>;
  current: Theme;

  constructor() {
    this.current = Theme.Light;
    this.theme = new BehaviorSubject(this.current);
  }

  toggle() {
    this.current = (this.current === Theme.Light) ? Theme.Dark : Theme.Light;
    console.log(`Changing theme to ${this.current}`);
    this.theme.next(this.current);
  }
}
