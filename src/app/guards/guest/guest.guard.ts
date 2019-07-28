import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserStore } from 'src/app/stores/user/user.store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GuestGuard implements CanActivate {

  constructor(private user: UserStore) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    return this.isGuest();
  }

  isGuest(): Observable<boolean> {
    return this.user.loggedIn.asObservable().pipe(
      map((isLoggedIn: boolean) => !isLoggedIn)
    );
  }

}
