import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup, AbstractControl, ValidatorFn } from '@angular/forms';
import { LogService } from 'src/app/services/log/log.service';
import { AlertService } from 'src/app/services/alert/alert.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserStore } from 'src/app/stores/user/user.store';
import { getLengthValidationError, getMinMaxValidators } from 'src/app/utils/validation.util';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { Action } from '../../models/action';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  submitted = {
    email: false,
    password: false
  };
  user$: Observable<User>;

  emailForm = new FormGroup({
    email: new FormControl(
      '',
      [Validators.required, Validators.email]
    ),
  });

  passwordForm = new FormGroup({
    oldPassword: new FormControl(
      '',
      [Validators.required]
    ),
    newPassword: new FormControl(
      '',
      [Validators.required, ...getMinMaxValidators('password')]
    )
  }, {
    validators: [this.samePasswordValidator]
  });

  constructor(private log: LogService, private authService: AuthService,
              private alert: AlertService, private user: UserStore) {
  }

  ngOnInit() {
    this.user$ = this.user.details;
  }

  changeEmail() {
    this.alert.showPasswordDialog(Action.ChangeEmail, password => {
      if (password) {
        this.submitted.email = true;
        const email = this.emailForm.value.email;
        const options = {
          email,
          password
        };
        this.log.info('Submitting changeEmail form:', options);
        this.authService.changeEmail(options).subscribe(
          _ => {
            this.submitted.email = false;
            this.user.email(email);
            this.alert.showSnackbar('Email changed successfully.');
          },
          err => {
            this.submitted.email = false;
            this.alert.showSnackbar(err.error);
          }
        );
      }
    });
  }

  changePassword() {
    this.submitted.password = true;
    const options = this.passwordForm.value;
    this.log.info('Submitting changePassword form:', options);
    this.authService.passwordChange(options).subscribe(
      _ => {
        this.submitted.password = false;
        this.alert.showSnackbar('Password changed successfully.');
      },
      err => {
        this.submitted.password = false;
        this.alert.showSnackbar(err.error);
      }
    );
  }

  get newPassword(): AbstractControl {
    return this.passwordForm.get('newPassword');
  }

  getLengthValidationError(field: string) {
    return getLengthValidationError(field);
  }

  samePasswordValidator(control: AbstractControl): { [key: string]: any } | null {
    const samePassword = control.get('newPassword').value === control.get('oldPassword').value;
    return samePassword ? {samePassword: true} : null;
  }

}
