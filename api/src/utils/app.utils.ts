import * as Koa from 'koa';
import * as crypto from 'crypto';
import { properties } from '../properties/properties';

export function configureMiddleware(app: Koa, arr: Koa.Middleware[]) {
  arr.forEach(middleware => app.use(middleware));
}

export function csrfToken() {
  const length = properties.xsrf.length;
  return crypto.randomBytes(length).toString('hex');
}