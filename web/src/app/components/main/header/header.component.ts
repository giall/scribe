import { Component, OnInit } from '@angular/core';
import { UserStore } from 'src/app/stores/user/user.store';
import { AlertService } from 'src/app/services/alert/alert.service';
import { Action } from 'src/app/models/action';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ConfigStore } from '../../../stores/config/config.store';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn$: Observable<boolean>;

  constructor(private user: UserStore, private alert: AlertService, private config: ConfigStore,
              private auth: AuthService, private router: Router) {
  }

  ngOnInit() {
    this.isLoggedIn$ = this.user.isLoggedIn$;
  }

  logOut(): void {
    const action = Action.LogOut;
    this.alert.showConfirmationDialog({action}, () => {
      this.config.rememberMe = false;
      this.auth.logout().subscribe((res: any) => {
        this.alert.showSnackbar(res.message);
      }, err => {
        console.error(err);
        this.alert.showSnackbar('Logged out.');
      }, () => {
        this.router.navigate(['/home']);
        this.user.clear();
      });
    });
  }

}
