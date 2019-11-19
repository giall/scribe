import { Component } from '@angular/core';
import { Action } from '../../../../models/action';
import { AlertService } from '../../../../services/alert/alert.service';
import { AuthService } from '../../../../services/auth/auth.service';
import { UserStore } from '../../../../stores/user/user.store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-account',
  templateUrl: './delete-account.component.html',
  styleUrls: ['./delete-account.component.css']
})
export class DeleteAccountComponent {

  submitted = false;

  constructor(private alert: AlertService, private auth: AuthService,
              private user: UserStore, private router: Router) { }

  delete() {
    this.alert.showPasswordDialog(Action.DeleteAccount, password => {
      if (password) {
        this.submitted = true;
        this.auth.deleteUser(password).subscribe(
          (res: any) => {
            this.submitted = false;
            this.user.clear();
            this.alert.showSnackbar(res.message);
            this.router.navigate(['/home']);
          },
          err => {
            this.submitted = false;
            this.alert.showSnackbar(err.error);
          }
        );
      }
    });
  }

}
