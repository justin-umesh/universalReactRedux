import compression from 'compression';
import winston from 'winston';
import express from 'express';

import * as m from './middlewares';
import { HOST, PORT, isDev, signal } from '../../webpack/env';

const app = express();

/**
 * Express Configuration
 */

app.disable('x-powered-by');

// compression
if (isDev) {
  app.enable('trust proxy');
} else {
  app.use(compression());
}

// I. Static Assets
app.use(m.staticMiddleware);
// II. API
app.use(m.apiMiddleware);
// III. Views
app.use(m.viewMiddleware);

//
// Initialise Express
// -----------------------------------------------------------------------------

app.listen(PORT, HOST, (err) => {
  if (err) return winston.error('[server.js]: Error: ', err);

  return winston.info(`${signal} http://%s:%s`, HOST, PORT, { timestamp: Date.now(), pid: process.pid });
});
