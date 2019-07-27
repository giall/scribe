import { Component } from '@angular/core';
import { ConfigStore, Theme } from './stores/config/config.store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'hecate-app';
  classes: string;

  constructor(config: ConfigStore) {
    config.theme.subscribe((theme) => this.classes = `wrapper mat-typography ${theme}`);
  }
}
