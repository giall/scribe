import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { getMinMaxValidators, getLengthValidationError } from 'src/app/utils/validation.util';
import { LogService } from 'src/app/services/log/log.service';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form = new FormGroup({
    username: new FormControl(
      '',
      [Validators.required, ...getMinMaxValidators('username')]
    ),
    email: new FormControl(
      '',
      [Validators.required, Validators.email]
    ),
    password: new FormControl(
      '',
      [Validators.required, ...getMinMaxValidators('password')]
      )
  });

  constructor(private logger: LogService, private auth: AuthenticationService, private _snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  onSubmit() {
    const options = this.form.value;
    this.logger.info('Submitting register form:', options);
    this.auth.register(options).subscribe(user => {
      console.log(user);
      // store user data
      // redirect to home
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
