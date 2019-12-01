import { Component, OnInit } from '@angular/core';
import { ConfigStore } from 'src/app/stores/config/config.store';
import { UserStore } from 'src/app/stores/user/user.store';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { Theme } from 'src/app/models/theme';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  emailVerificationRequired = false;
  theme$: Observable<Theme>;
  user$: Observable<User>;

  constructor(private config: ConfigStore, private user: UserStore) { }

  ngOnInit() {
    this.theme$ = this.config.theme;
    this.user$ = this.user.details$;
  }
}
