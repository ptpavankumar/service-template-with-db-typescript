#!/usr/bin/env node

import * as http from 'http';

const app = require('./app');

const server = http.createServer(app);
const port = process.env.PORT || '3000';

const onListening = () => {
  const addr = server.address();
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
  console.log(`Listening on ${bind}`); // eslint-disable-line no-console
};

app.set('port', port);
server.listen(port);
server.on('listening', onListening);
