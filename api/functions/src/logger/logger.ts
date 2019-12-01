import * as pino from 'pino';
import { properties } from '../properties/properties';

export class Logger {
  private logger: pino.Logger | Console;

  constructor() {
    const { level } = properties.logging;
    this.logger = (level !== 'test') ? pino({level}) : console;
  }

  debug(val: any, ...args: any[]) {
    this.logger.debug(val, ...args);
  }

  info(val: any, ...args: any[]) {
    this.logger.info(val, ...args);
  }

  warn(val: any, ...args: any[]) {
    this.logger.warn(val, ...args);
  }

  error(val: any, ...args: any[]) {
    this.logger.error(val, ...args);
  }
}
