import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Action } from '../../../../models/action';
import { AlertService } from '../../../../services/alert/alert.service';
import { LogService } from '../../../../services/log/log.service';
import { AuthService } from '../../../../services/auth/auth.service';
import { UserStore } from '../../../../stores/user/user.store';

@Component({
  selector: 'app-change-email',
  templateUrl: './change-email.component.html',
  styleUrls: ['./change-email.component.css']
})
export class ChangeEmailComponent implements OnInit {

  @Input()
  email: string;

  @Input()
  verified: boolean;

  form: FormGroup;
  submitted = false;

  constructor(private alert: AlertService, private log: LogService,
              private auth: AuthService, private user: UserStore) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(
        this.email
      ),
    });
  }

  changeEmail() {
    this.alert.showPasswordDialog(Action.ChangeEmail, password => {
      if (password) {
        const email = this.form.value.email;
        if (email !== this.email) {
          this.submitted = true;
          const options = {
            email,
            password
          };
          this.log.info('Submitting changeEmail form:', options);
          this.auth.changeEmail(options).subscribe(
            _ => {
              this.submitted = false;
              this.user.email(email);
              this.alert.showSnackbar('Email changed successfully.');
            },
            err => {
              this.submitted = false;
              this.alert.showSnackbar(err.error);
            }
          );
        } else {
          this.alert.showSnackbar('Email is the same as current one.');
        }
      }
    });
  }
}
