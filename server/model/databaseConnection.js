import winston from '../config/winston';
import createTables from './createTable';

const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const seed = () => {
  const qry = createTables;
  pool.query(qry, (err, result) => {
    if (err) {
      winston.info(err.toString());
    } else {
      winston.info(result);
    }
  });
};

const connect = () => {
  pool.connect()
    .then((err) => {
      winston.info('database connection established');
      if (!err) {
        seed();
      }
    });
};
connect();

const databaseConnection = {
  query: (text, params, callback) => pool.query(text, params, callback),
};
export default databaseConnection;
