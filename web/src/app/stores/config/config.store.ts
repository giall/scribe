import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LogService } from '../../services/log/log.service';
import { Theme } from 'src/app/models/theme';
import { StorageService } from '../../services/storage/storage.service';
import { REMEMBER_ME, THEME_KEY } from '../../constants/storage.constants';

@Injectable({
  providedIn: 'root'
})
export class ConfigStore {

  currentTheme: BehaviorSubject<Theme>;

  constructor(private log: LogService, private storage: StorageService) {
    this.currentTheme = this.getThemePreference();
  }

  get rememberMe(): boolean {
    return !!this.storage.get(REMEMBER_ME);
  }

  get theme(): Observable<Theme> {
    return this.currentTheme.asObservable();
  }

  toggleTheme() {
    const theme = (this.currentTheme.getValue() === Theme.Light) ? Theme.Dark : Theme.Light;
    this.log.info(`Changing theme to ${theme}`);
    this.storage.set(THEME_KEY, theme);
    this.currentTheme.next(theme);
  }

  private getThemePreference(): BehaviorSubject<Theme> {
    const theme = this.storage.get(THEME_KEY) === Theme.Dark ? Theme.Dark : Theme.Light;
    return new BehaviorSubject(theme);
  }
}
