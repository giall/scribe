import { Controller, Get, KoaController, Post } from 'koa-joi-controllers';
import { Context } from 'koa';
import { properties } from '../properties/properties';
import { csrfToken } from '../utils/app.utils';
import { log } from '../logger/log';

@Controller('/')
export class RootController extends KoaController {

  @Get('/ping')
  async ping(ctx: Context) {
    ctx.status = 200;
    ctx.body = 'Notes service is up and running...';
  }

  @Post()
  async csrf(ctx: Context) {
    log.debug('Setting CSRF token');
    const token = csrfToken();
    ctx.cookies.set(properties.xsrf.cookie, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'none'
    });
    ctx.status = 200;
    ctx.body = {token};
  }
}
