import { Controller, Get, KoaController } from 'koa-joi-controllers';
import { Context } from 'koa';
import { properties } from '../properties/properties';
import { csrfToken } from '../utils/app.utils';
import { log } from '../logger/log';

@Controller('/')
export class RootController extends KoaController {

  @Get()
  async csrf(ctx: Context) {
    log.debug('Setting CSRF token');
    ctx.cookies.set(properties.xsrf.cookie, csrfToken(), {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production'
    });
    ctx.status = 200;
    ctx.body = {};
  }

  @Get('/ping')
  async ping(ctx: Context) {
    ctx.status = 200;
    ctx.body = 'Notes service is up and running...';
  }
}
