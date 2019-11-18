import { Injectable } from '@angular/core';
import { LogService } from '../log/log.service';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  storage: Storage;

  constructor(private log: LogService) {
    this.storage = window.localStorage;
  }

  get(key: string): string {
    const value = this.storage.getItem(key);
    this.log.info(`Storage.get: key=${key}, value=${value}`);
    return value;
  }

  set(key: string, value: string) {
    try {
      this.log.info(`Storage.set: key=${key}l value=${value}`);
      this.storage.setItem(key, value);
    } catch (err) {
      this.log.error(err);
    }
  }
}
