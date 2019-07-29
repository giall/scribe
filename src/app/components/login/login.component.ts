import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { getMinMaxValidators, getLengthValidationError } from 'src/app/utils/validation.util';
import { LogService } from 'src/app/services/log/log.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserStore } from 'src/app/stores/user/user.store';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  submitted = false;

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

  constructor(private logger: LogService, private authService: AuthService,
    private alert: AlertService, private user: UserStore, private router: Router) { }

  ngOnInit() {
  }

  onSubmit() {
    this.submitted = true;
    const options = this.form.value;
    this.logger.info('Submitting login form:', options);
    this.authService.login(options).subscribe(
      _ => {
        this.alert.showSnackbar('Successfully logged in.');
        this.router.navigate(['/home']);
      },
      err => {
        this.submitted = false;
        this.alert.showSnackbar(err);
      });
  }

  getLengthValidationError(field: string) {
    return getLengthValidationError(field);
  }

}
