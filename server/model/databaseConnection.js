import dotenv from 'dotenv';
import pg from 'pg';
import winston from '../config/winston';
import createTables from './createTable';

const { Pool } = pg;
dotenv.config();

const pool = new Pool();

const seed = () => {
  const qry = createTables;
  pool.query(qry, (err, dbRes) => {
    if (err) {
      winston.info(err.toString());
    } else {
      winston.info(dbRes);
    }
  });
};

const connect = () => {
  pool.connect()
    .then((client) => {
      winston.info('database connection established');
      if (client) {
        seed();
      }
    }).catch(error => error);
};
connect();

const databaseConnection = {
  query: (text, params, callback) => pool.query(text, params, callback),
};

export default databaseConnection;
