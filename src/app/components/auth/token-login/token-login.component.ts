import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { AlertService } from '../../../services/alert/alert.service';
import { first, map } from 'rxjs/operators';
import { UserStore } from '../../../stores/user/user.store';

@Component({
  selector: 'app-token-login',
  templateUrl: './token-login.component.html',
  styleUrls: ['./token-login.component.css']
})
export class TokenLoginComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  constructor(private route: ActivatedRoute, private router: Router, private user: UserStore,
              private auth: AuthService, private alert: AlertService) {
  }

  ngOnInit() {
    const token$ = this.route.queryParamMap.pipe(
      map((params: ParamMap) => params.get('token')),
      first()
    );
    token$.subscribe((token: string) => {
      this.subscription = this.auth.magicLogin(token)
        .subscribe(
          user => {
            this.user.set(user);
            this.alert.showSnackbar('Successfully logged in.');
            this.router.navigate(['/home']);
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
