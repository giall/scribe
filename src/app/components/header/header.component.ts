import { Component, OnInit } from '@angular/core';
import { UserStore } from 'src/app/stores/user/user.store';
import { AlertService } from 'src/app/services/alert/alert.service';
import { Action } from 'src/app/models/action';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn: Observable<boolean>;

  constructor(private user: UserStore, private alert: AlertService,
              private auth: AuthService, private router: Router) {
  }

  ngOnInit() {
    this.isLoggedIn = this.user.isLoggedIn;
  }

  logOut(): void {
    this.alert.showConfirmationDialog(Action.LogOut, () => {
      this.auth.logout().subscribe(_ => {
        if (this.router.url === '/account') {
          this.router.navigate(['/home']);
        }
        this.user.clear();
        this.alert.showSnackbar('Successfully logged out.');
      });
    });
  }

}
