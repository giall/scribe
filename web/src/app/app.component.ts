import { Component, OnInit } from '@angular/core';
import { ConfigStore } from './stores/config/config.store';
import { Theme } from './models/theme';
import { AuthService } from './services/auth/auth.service';
import { UserStore } from './stores/user/user.store';
import { User } from './models/user';
import {LogService} from './services/log/log.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'scribe';
  classes: string;

  constructor(private config: ConfigStore, private auth: AuthService,
              private user: UserStore, private log: LogService) { }

  ngOnInit() {
    this.config.theme.subscribe((theme: Theme) => this.classes = `wrapper mat-typography ${theme}`);
    if (this.config.rememberMe) {
      this.log.info('Remember Me option set; attempting to refresh session...');
      this.auth.refresh().subscribe((user: User) => {
          this.log.info('Tokens refreshed and user login successful.');
          this.user.set(user);
        },
        err => {
          this.log.error(err);
        });
    }
  }
}
