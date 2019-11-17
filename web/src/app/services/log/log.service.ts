import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  constructor() { }

  info(...args: any[]) {
    if (!environment.production) {
      console.log(...args);
    }
  }

  error(...args: any[]) {
    console.error(...args);
  }
}
