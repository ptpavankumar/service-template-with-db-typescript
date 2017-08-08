import * as _ from 'lodash';
import * as knex from 'knex';
import * as express from 'express';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';

const container = require('./ioc');
import { routes } from './routes';
const dbConfig = require('./config/dbconfig');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Register all the routes
app.use((req, res, next) => {
  const stack = process.env.STACK || 'development';
  const knexInstance = knex(dbConfig[stack]);
  container.registerValue({
    knex: knexInstance
  });
  req.scope = container.createScope(); // eslint-disable-line no-param-reassign
  next();
});

// Register all the routers
_.forEach(routes, router => app.use(router));

module.exports = app;
