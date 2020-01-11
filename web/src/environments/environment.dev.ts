export const environment = {
  production: false,
  tracing: false,
  url: {
    auth: 'https://us-central1-scribe-demo.cloudfunctions.net/hecate/api',
    notes: 'https://us-central1-scribe-demo.cloudfunctions.net/scribe/scribe'
  },
  xsrf: {
    header: 'X-XSRF-TOKEN',
    cookie: 'XSRF-TOKEN'
  }
};
