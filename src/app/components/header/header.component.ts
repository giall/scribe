import { Component, OnInit } from '@angular/core';
import { UserStore } from 'src/app/stores/user/user.store';
import { AlertService } from 'src/app/services/alert/alert.service';
import { Action } from 'src/app/models/action';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  isLoggedIn = false;

  constructor(private user: UserStore, private alert: AlertService, private auth: AuthenticationService) { }

  ngOnInit() {
    this.user.loggedIn.subscribe(isLoggedIn => this.isLoggedIn = isLoggedIn);
  }

  logOut(): void {
    this.alert.showConfirmationDialog(Action.LogOut, () => {
      this.auth.logout().subscribe(
        _ => {
          this.user.clear();
          this.alert.showSnackbar('Successfully logged out.');
        },
        err => {
          console.error(err);
          this.alert.showSnackbar('Something went wrong, please try again.');
        }
      );
    });
  }

}