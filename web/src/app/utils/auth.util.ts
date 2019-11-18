import { environment } from '../../environments/environment';

function url(endpoint: string) {
  return `${environment.url.auth}/${endpoint}`;
}

export { url };
