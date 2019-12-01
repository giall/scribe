import { Component, OnInit } from '@angular/core';
import { UserStore } from 'src/app/stores/user/user.store';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  user$: Observable<User>;

  constructor(private user: UserStore, private router: Router) {
  }

  ngOnInit() {
    this.user$ = this.user.details$;
    this.user$.subscribe(details => {
      if (!details) {
        this.router.navigate(['/login']);
      }
    });
  }
}
