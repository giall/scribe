import { Component } from '@angular/core';
import { ThemeService } from 'src/app/services/theme/theme.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private themeService: ThemeService) { }

  toggleTheme() {
    this.themeService.toggle();
  }

}
