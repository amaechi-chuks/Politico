import winston from '../config/winston';
import databaseConnection from './databaseConnection';
import createTables from './createTable';

const queries = `${createTables}`;

// Create tables on Heroku Postgres
databaseConnection.query(queries, () => {
  winston.info('Tables Created');
  databaseConnection.end();
});
