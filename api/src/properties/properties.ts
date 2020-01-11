if (process.env.NODE_ENV !== 'production') {
  // tslint:disable-next-line:no-implicit-dependencies
  require('dotenv').config();
}

export const properties = {
  app: {
    host: process.env.APP_URL,
    proxy: true
  },
  logging: {
    level: process.env.LOG_LEVEL || 'info'
  },
  jwt: {
    secret: process.env.JWT_SECRET
  },
  mongodb: {
    url: process.env.MONGODB_URL,
    name: process.env.MONGODB_NAME,
    user: process.env.MONGODB_USER,
    password: process.env.MONGODB_PASSWORD
  },
  xsrf: {
    cookie: 'XSRF-TOKEN',
    header: 'X-XSRF-TOKEN',
    length: 48
  }
};
