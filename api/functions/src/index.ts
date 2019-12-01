import * as functions from 'firebase-functions';
import { App } from './app';
import { Database } from './database/database';
import { properties } from './properties/properties';

function create(): App {
  const {user, password, url} = properties.mongodb;
  const database = new Database(`mongodb+srv://${user}:${password}@${url}?retryWrites=true&w=majority`);
  return new App(database);
}

const app = create().bootstrap();
export const scribe = functions.https.onRequest(app.callback());
