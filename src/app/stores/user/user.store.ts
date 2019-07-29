import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LogService } from 'src/app/services/log/log.service';
import { User } from 'src/app/models/user';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserStore {

  private user: BehaviorSubject<User>;

  constructor(private logger: LogService) {
    this.user = new BehaviorSubject(undefined);
  }

  get details(): Observable<User> {
    return this.user.asObservable();
  }

  get isLoggedIn(): Observable<boolean> {
    return this.details.pipe(
      map(user => !!user)
    );
  }

  set(user: User) {
    this.logger.info('Setting user to store:', user);
    this.user.next(user);
  }

  clear() {
    this.logger.info('Clearing user from store');
    this.user.next(undefined);
  }
}
