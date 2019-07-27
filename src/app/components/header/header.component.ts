import { Component, OnInit } from '@angular/core';
import { UserStore } from 'src/app/stores/user/user.store';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  isLoggedIn = false;

  constructor(private user: UserStore) { }

  ngOnInit() {
    this.user.loggedIn.subscribe(isLoggedIn => this.isLoggedIn = isLoggedIn);
  }

  logOut() {
    this.user.clear();
  }

}
