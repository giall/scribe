import { Component } from '@angular/core';
import { ConfigStore } from 'src/app/stores/config/config.store';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  constructor(private themeService: ConfigStore) { }

  toggleTheme() {
    this.themeService.toggle();
  }

}
