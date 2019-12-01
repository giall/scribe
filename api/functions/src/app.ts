import * as Koa from 'koa';

import { RootController } from './controllers/root.controller';
import { configureRoutes, KoaController } from 'koa-joi-controllers';
import { configureMiddleware } from './utils/app.utils';
import { cors, errorHandler, send } from './middleware/middleware';
import { log } from './logger/log';
import { properties } from './properties/properties';
import { Database } from './database/database';
import { NotesController } from './controllers/notes.controller';
import { NotesRepository } from './repositories/notes.repository';

export class App {
    private readonly database: Database;

    constructor(database: Database) {
        this.database = database;
    }

    bootstrap(): Koa {
        log.info('Bootstrapping app...');
        log.info(`Environment is ${process.env.NODE_ENV}`);
        const app = new Koa();
        configureMiddleware(app, [
            send, errorHandler, cors
        ]);
        configureRoutes(app, this.controllers());
        log.info('Controllers and middleware configured.');
        app.proxy = properties.app.proxy;
        return app;
    }

    private controllers(): KoaController[] {
        const notesRepository = new NotesRepository(this.database);
        return [
          new RootController(),
          new NotesController(notesRepository)
        ];
    }
}
