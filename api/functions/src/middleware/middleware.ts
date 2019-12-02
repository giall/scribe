import * as koaCors from '@koa/cors';
import { Context, Next } from 'koa';
import { AppError, Errors } from '../error/errors';
import { log } from '../logger/log';
import { properties } from '../properties/properties';
import { decode, Payload, Token } from '../utils/token.utils';

async function errorHandler(ctx: Context, next: Next) {
    try {
        await next();
    } catch (err) {
        if (err instanceof AppError) {
            ctx.status = err.status;
            ctx.body = err.message;
        } else if (err.name === 'ValidationError') {
            log.warn(err);
            ctx.status = 400;
            ctx.body = 'Invalid input.';
        } else {
            log.error(err);
            ctx.status = 500;
            ctx.body = 'Something went wrong; please try again.';
        }
    }
}

async function send(ctx: Context, next: Next) {
    ctx.send = function(status: number, value: string | object) {
        ctx.status = status;
        ctx.body = typeof value === 'string' ? {message: value} : value;
    };
    await next();
}

function cors(ctx: Context, next: Next) {
    return koaCors({
        origin: properties.app.host,
        allowHeaders: 'content-type',
        credentials: true
    })(ctx, next);
}

async function access(ctx: Context, next: Next) {
  const token = ctx.cookies.get(Token.Access);
  if (token) {
    const payload = decode(token) as Payload;
    ctx.user = payload.id;
    await next();
  } else {
    log.warn('No access token included in request');
    throw Errors.unauthorized('Invalid token.');
  }
}

async function csrf(ctx: Context, next: Next) {
  const cookie = ctx.cookies.get(properties.xsrf.cookie) || '';
  const header = ctx.get(properties.xsrf.header);
  if (cookie.length !== properties.xsrf.length && cookie !== header) {
    log.warn(`Invalid CSRF token: ${header}`);
    throw Errors.forbidden('Invalid CSRF Token');
  }
  log.debug('CSRF token is valid; continuing...');
  await next();
}

async function functionsFramework(ctx: Context, next: Next) {
  const environment = process.env.NODE_ENV as string;
  if (!['development', 'test', 'ci'].includes(environment)) {
    // @ts-ignore
    ctx.request = ctx.request.req; // for Functions Framework environments
  }
  await next();
}

export {
    errorHandler, send, cors, access, functionsFramework, csrf
};
