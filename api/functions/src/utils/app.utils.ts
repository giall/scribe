import * as Koa from 'koa';

export function configureMiddleware(app: Koa, arr: Koa.Middleware[]) {
    arr.forEach(middleware => app.use(middleware));
}
