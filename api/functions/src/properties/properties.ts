if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

export const properties = {
  app: {
    host: process.env.APP_URL || 'http://localhost:4200',
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
    name: process.env.MONGODB_NAME || 'scribe',
    user: process.env.MONGODB_USER,
    password: process.env.MONGODB_PASSWORD
  }
};
