import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { AlertService } from '../../../services/alert/alert.service';
import { first, map } from 'rxjs/operators';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { getMinMaxValidators, getLengthValidationError, Field } from 'src/app/utils/validation.util';
import { LogService } from '../../../services/log/log.service';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit, OnDestroy {

  token$: Observable<string>;
  subscription: Subscription;
  submitted = false;
  form = new FormGroup({
    newPassword: new FormControl(
      '',
      [Validators.required, ...getMinMaxValidators(Field.Password)]
    )
  });

  constructor(private route: ActivatedRoute, private router: Router,
              private auth: AuthService, private alert: AlertService,
              private log: LogService) {
  }

  ngOnInit() {
    this.token$ = this.route.queryParamMap.pipe(
      map((params: ParamMap) => params.get('token')),
      first()
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onSubmit() {
    this.submitted = true;
    this.token$.subscribe((token: string) => {
      const options = {
        ...this.form.value,
        token
      };
      this.log.info('Submitting password reset form:', options);
      this.subscription = this.auth.passwordReset(options)
        .subscribe(
          (res: any) => {
            this.alert.showSnackbar(res.message);
            this.router.navigate(['/login']);
          },
          err => {
            this.submitted = false;
            this.alert.showSnackbar(err.error);
          }
        );
    });
  }

  get passwordValidationError() {
    return getLengthValidationError(Field.Password);
  }
}
