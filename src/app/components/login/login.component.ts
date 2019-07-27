import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { getMinMaxValidators, getLengthValidationError } from 'src/app/utils/validation.util';
import { LogService } from 'src/app/services/log/log.service';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserStore } from 'src/app/stores/user/user.store';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form = new FormGroup({
    email: new FormControl(
      '',
      [Validators.required, Validators.email]
    ),
    password: new FormControl(
      '',
      [Validators.required, ...getMinMaxValidators('password')]
      )
  });

  constructor(private logger: LogService, private authService: AuthenticationService,
    private _snackBar: MatSnackBar, private user: UserStore) { }

  ngOnInit() {
  }

  onSubmit() {
    const options = this.form.value;
    this.logger.info('Submitting login form:', options);
    this.authService.login(options).subscribe(user => {
      this.user.set(user);
    }, err => {
      this._snackBar.open(err, 'CLOSE', {
        duration: 2000
      });
    });
  }

  getLengthValidationError(field: string) {
    return getLengthValidationError(field);
  }

}
