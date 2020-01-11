import * as http from 'http';
import { scribe } from './index';
import { log } from './logger/log';

const port = process.env.PORT || 5000;
http.createServer(scribe).listen(port);
log.info(`Server running on port ${port}...`);
