import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { getMinMaxValidators, getLengthValidationError, Field } from '../../../utils/validation.util';
import { AlertService } from '../../../services/alert/alert.service';
import { LogService } from '../../../services/log/log.service';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  submitted = false;
  form: FormGroup;

  constructor(private alert: AlertService, private log: LogService, private auth: AuthService) { }

  ngOnInit() {
    this.form = new FormGroup({
      oldPassword: new FormControl(
        '',
        [Validators.required]
      ),
      newPassword: new FormControl(
        '',
        [Validators.required, ...getMinMaxValidators(Field.Password)]
      )
    }, {
      validators: [this.samePasswordValidator]
    });
  }

  get newPassword(): AbstractControl {
    return this.form.get('newPassword');
  }

  get passwordValidationError() {
    return getLengthValidationError(Field.Password);
  }

  changePassword() {
    this.submitted = true;
    const options = this.form.value;
    this.log.info('Submitting changePassword form:', options);
    this.auth.passwordChange(options).subscribe(
      _ => {
        this.submitted = false;
        this.alert.showSnackbar('Password changed successfully.');
      },
      err => {
        this.submitted = false;
        this.alert.showSnackbar(err.error);
      }
    );
  }

  samePasswordValidator(control: AbstractControl): { [key: string]: any } | null {
    const samePassword = control.get('newPassword').value === control.get('oldPassword').value;
    return samePassword ? {samePassword: true} : null;
  }
}
