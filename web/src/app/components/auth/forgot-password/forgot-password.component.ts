import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LogService } from '../../../services/log/log.service';
import { AuthService } from '../../../services/auth/auth.service';
import { AlertService } from '../../../services/alert/alert.service';
import { UserStore } from '../../../stores/user/user.store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  submitted = false;

  form = new FormGroup({
    email: new FormControl(
      '',
      [Validators.required, Validators.email]
    )
  });

  constructor(private log: LogService, private authService: AuthService,
              private alert: AlertService, private user: UserStore, private router: Router) {
  }

  ngOnInit() {
  }

  onSubmit() {
    this.submitted = true;
    const options = this.form.value;
    this.log.info('Submitting password reset form:', options);
    this.authService.forgotPassword(options).subscribe(
      (res: any) => {
        this.alert.showSnackbar(res.message);
        this.router.navigate(['/home']);
      },
      err => {
        this.log.error(err);
        this.submitted = false;
        this.alert.showSnackbar(err.error);
      });
  }

}
