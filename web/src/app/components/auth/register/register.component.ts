import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Field, getLengthValidationError, getMinMaxValidators } from 'src/app/utils/validation.util';
import { LogService } from 'src/app/services/log/log.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { AlertService } from 'src/app/services/alert/alert.service';
import { UserStore } from 'src/app/stores/user/user.store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  submitted = false;

  form = new FormGroup({
    username: new FormControl(
      '',
      [Validators.required, ...getMinMaxValidators(Field.Username)]
    ),
    email: new FormControl(
      '',
      [Validators.required, Validators.email]
    ),
    password: new FormControl(
      '',
      [Validators.required, ...getMinMaxValidators(Field.Password)]
    )
  });

  constructor(private log: LogService, private auth: AuthService,
              private user: UserStore, private router: Router, private alert: AlertService) {
  }

  ngOnInit() {
  }

  onSubmit() {
    this.submitted = true;
    const options = this.form.value;
    this.log.info('Submitting register form:', options);
    this.auth.register(options).subscribe(
      (res: any) => {
        this.user.set(res.user);
        this.alert.showSnackbar(res.message);
        this.router.navigate(['/home']);
      },
      err => {
        this.submitted = false;
        this.alert.showSnackbar(err.error);
      }
    );
  }

  get usernameValidationError() {
    return getLengthValidationError(Field.Username);
  }

  get passwordValidationError() {
    return getLengthValidationError(Field.Password);
  }

}
