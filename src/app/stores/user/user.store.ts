import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LogService } from 'src/app/services/log/log.service';

@Injectable({
  providedIn: 'root'
})
export class UserStore {

  loggedIn: BehaviorSubject<boolean>;
  current: BehaviorSubject<any>;

  constructor(private logger: LogService) {
    this.loggedIn = new BehaviorSubject(false);
    this.current = new BehaviorSubject(undefined);
  }

  set(user: any) {
    this.logger.info('Setting user to store:', user);
    this.loggedIn.next(true);
    this.current.next(user);
  }

  clear() {
    this.logger.info('Clearing user from store');
    this.loggedIn.next(false);
    this.current.next(undefined);
  }
}
