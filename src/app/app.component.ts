import { Component } from '@angular/core';
import { ThemeService, Theme } from './services/theme/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'hecate-app';
  classes: string;

  constructor(themeService: ThemeService) {
    themeService.theme.subscribe((theme) => this.classes = `wrapper mat-typography ${theme}`);
  }
}
