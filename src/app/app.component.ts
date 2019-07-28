import { Component } from '@angular/core';
import { ConfigStore } from './stores/config/config.store';
import { Theme } from './models/theme';
import { AuthenticationService } from './services/authentication/authentication.service';
import { UserStore } from './stores/user/user.store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'hecate-app';
  classes: string;

  constructor(config: ConfigStore, auth: AuthenticationService, user: UserStore) {
    config.theme.subscribe((theme: Theme) => this.classes = `wrapper mat-typography ${theme}`);
    auth.tokenLogin().subscribe((res) => {
      user.set(res);
    },
    err => {
      console.error(err);
    })
  }
}
