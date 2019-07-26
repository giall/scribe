import { Component } from '@angular/core';

enum Style {
  Light = 'hecate-light-theme',
  Dark = 'hecate-dark-theme'
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'hecate-app';
  style = Style.Light;

  toggleTheme() {
    this.style = (this.style === Style.Light) ? Style.Dark : Style.Light;
  }
}
