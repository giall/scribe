import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { getMinMaxValidators, getLengthValidationError } from 'src/app/utils/validation.util';
import { LogService } from 'src/app/services/log/log.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { AlertService } from 'src/app/services/alert/alert.service';
import { UserStore } from 'src/app/stores/user/user.store';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';

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
      (user: User) => {
        this.user.set(user);
        this.router.navigate(['/home']);
      },
      err => {
        this.submitted = false;
        this.alert.showSnackbar(err.error);
      }
    );
  }

  getLengthValidationError(field: string) {
    return getLengthValidationError(field);
  }

}
