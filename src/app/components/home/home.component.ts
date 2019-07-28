import { Component, OnInit } from '@angular/core';
import { ConfigStore } from 'src/app/stores/config/config.store';
import { UserStore } from 'src/app/stores/user/user.store';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  image: string;
  welcomeText = 'Welcome to Hecate!';
  
  details: {
    email: string;
    verified: boolean;
  }

  constructor(private config: ConfigStore, private user: UserStore) { }

  ngOnInit() {
    this.config.theme.subscribe(theme => this.image = `assets/img/auth_${theme}.svg`);
    this.user.current.subscribe(user => {
      if (user) {
        this.welcomeText = `Welcome to Hecate, ${user.username}!`;
        this.details = {
          email: user.email,
          verified: user.verified
        }
      } else {
        this.welcomeText = 'Welcome to Hecate!';
        this.details = undefined;
      }
    });
  }
}
