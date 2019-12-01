import { Component } from '@angular/core';
import { Action } from '../../../../models/action';
import { UserStore } from '../../../../stores/user/user.store';
import { AlertService } from '../../../../services/alert/alert.service';
import { ConfigStore } from '../../../../stores/config/config.store';
import { AuthService } from '../../../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-out-sessions',
  templateUrl: './log-out-sessions.component.html',
  styleUrls: ['./log-out-sessions.component.css']
})
export class LogOutSessionsComponent {

  submitted = {
    [Action.LogOut.valueOf()]: false,
    [Action.LogOutAll.valueOf()]: false
  };

  constructor(private user: UserStore, private alert: AlertService, private config: ConfigStore,
              private auth: AuthService, private router: Router) { }

  logOut(): void {
    this.post(this.auth.logout.bind(this.auth), Action.LogOut);
  }

  invalidate() {
    const prompt = 'You will be logged out of all devices. Are you sure?';
    this.post(this.auth.invalidate.bind(this.auth), Action.LogOutAll, prompt);
  }

  private post(request, action: Action, prompt?: string) {
    const width = action === Action.LogOutAll ? '400px' : null;
    this.alert.showConfirmationDialog({action, prompt, width}, () => {
      this.submitted[action] = true;
      this.config.rememberMe = false;
      request().subscribe((res: any) => {
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
