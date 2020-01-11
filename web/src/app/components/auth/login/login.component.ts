import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Field, getLengthValidationError, getMinMaxValidators } from 'src/app/utils/validation.util';
import { LogService } from 'src/app/services/log/log.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserStore } from 'src/app/stores/user/user.store';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert/alert.service';
import { ConfigStore } from '../../../stores/config/config.store';
import { NotesService } from '../../../services/notes/notes.service';

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
      [Validators.required, ...getMinMaxValidators(Field.Password)]
    ),
    rememberMe: new FormControl(
      false
    )
  });

  constructor(private log: LogService, private authService: AuthService, private config: ConfigStore,
              private alert: AlertService, private user: UserStore, private router: Router,
              private notes: NotesService) {
  }

  ngOnInit() {
  }

  onSubmit() {
    this.submitted = true;
    const options = this.form.value;
    this.log.info('Submitting login form:', options);
    this.authService.login(options).subscribe(
      (res: any) => {
        this.log.info('Login successful, getting CSRF token...');
        this.notes.init().subscribe(
          _ => {
            this.log.info('CSRF token set.');
            this.config.rememberMe = options.rememberMe;
            this.user.set(res.user);
            this.alert.showSnackbar(res.message);
            this.router.navigate(['/home']);
          },
          err => this.log.error(err)
        );
      },
      err => {
        this.submitted = false;
        this.alert.showSnackbar(err.error);
      });
  }

  get passwordValidationError() {
    return getLengthValidationError(Field.Password);
  }

}
