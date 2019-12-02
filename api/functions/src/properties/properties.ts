import * as functions from 'firebase-functions';

let config: any = {
  mongodb: {}
};
if (process.env.NODE_ENV !== 'production') {
  // tslint:disable-next-line:no-implicit-dependencies
  require('dotenv').config();
} else {
  config = functions.config();
}

export const properties = {
  app: {
    host: process.env.APP_URL || config.app.host,
    proxy: true
  },
  logging: {
    level: process.env.LOG_LEVEL || config.logging.level || 'info'
  },
  jwt: {
    secret: process.env.JWT_SECRET || config.jwt.secret
  },
  mongodb: {
    url: process.env.MONGODB_URL || config.mongodb.url,
    name: process.env.MONGODB_NAME || config.mongodb.name,
    user: process.env.MONGODB_USER || config.mongodb.user,
    password: process.env.MONGODB_PASSWORD || config.mongodb.password
  },
  xsrf: {
    cookie: 'XSRF-TOKEN',
    header: 'X-XSRF-TOKEN',
    length: 48
  }
};
