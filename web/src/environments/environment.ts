export const environment = {
  production: false,
  tracing: false,
  url: {
    auth: '/api',
    notes: '/scribe-notes/us-central1/scribe'
  },
  xsrf: {
    header: 'X-XSRF-TOKEN',
    cookie: 'XSRF-TOKEN'
  }
};

import 'zone.js/dist/zone-error';
