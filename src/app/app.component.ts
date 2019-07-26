import { Component } from '@angular/core';
import { ThemeService, Theme } from './theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'hecate-app';
  theme: Theme;

  constructor(private themeService: ThemeService) {
    themeService.theme.subscribe((theme) => this.theme = theme);
  }

  toggleTheme() {
    this.themeService.toggle();
  }
}
