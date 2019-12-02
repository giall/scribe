import { Component, OnInit } from '@angular/core';
import { ConfigStore } from './stores/config/config.store';
import { Theme } from './models/theme';
import { AuthService } from './services/auth/auth.service';
import { UserStore } from './stores/user/user.store';
import { LogService } from './services/log/log.service';
import { NotesService } from './services/notes/notes.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'scribe';
  classes: string;
  show = false;

  constructor(private config: ConfigStore, private auth: AuthService, private notes: NotesService,
              private user: UserStore, private log: LogService) { }

  ngOnInit() {
    this.config.theme.subscribe((theme: Theme) => this.classes = `wrapper mat-typography ${theme}`);
    if (this.config.rememberMe) {
      this.log.info('Remember Me option set; attempting to refresh session...');
      this.auth.refresh().subscribe((res: any) => {
          this.log.info('Tokens refreshed and user login successful.');
          this.user.set(res.user);
          this.log.info('Getting CSRF token...');
          this.notes.init().subscribe(
            _ => this.show = true,
            err => this.log.error(err)
          );
        },
        err => {
          this.log.error(err);
          this.config.rememberMe = false;
          this.show = true;
        });
    } else {
      this.show = true;
    }
  }
}
