import databaseConnection from './databaseConnection';
import dropQuery from './dropTable';
import createTables from './createTable';

const queries = `${dropQuery}${createTables}`;

databaseConnection.query(queries, () => {
  databaseConnection.end();
});
