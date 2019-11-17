import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {map, first, takeUntil} from 'rxjs/operators';
import {AuthService} from 'src/app/services/auth/auth.service';
import {AlertService} from 'src/app/services/alert/alert.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.css']
})
export class EmailVerificationComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  constructor(private route: ActivatedRoute, private router: Router,
              private auth: AuthService, private alert: AlertService) {
  }

  ngOnInit() {
    const token$ = this.route.queryParamMap.pipe(
      map((params: ParamMap) => params.get('token')),
      first()
    );
    token$.subscribe((token: string) => {
      this.subscription = this.auth.verifyEmail(token)
        .subscribe(
          _ => {
            this.alert.showSnackbar('Your email has been verified!');
            this.router.navigate(['/login']);
          },
          err => {
            this.alert.showSnackbar(err.error);
            this.router.navigate(['/home']);
          }
        );
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
