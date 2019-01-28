

Object.defineProperty(exports, '__esModule', {
  value: true,
});

const _dotenv = require('dotenv');

const _dotenv2 = _interopRequireDefault(_dotenv);

const _pg = require('pg');

const _pg2 = _interopRequireDefault(_pg);

const _winston = require('../config/winston');

const _winston2 = _interopRequireDefault(_winston);

const _createTable = require('./createTable');

const _createTable2 = _interopRequireDefault(_createTable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Pool = _pg2.default.Pool;

_dotenv2.default.config();

const pool = new Pool();

const seed = function seed() {
  const qry = _createTable2.default;
  pool.query(qry, (err, dbRes) => {
    if (err) {
      _winston2.default.info(err.toString());
    } else {
      _winston2.default.info(dbRes);
    }
  });
};

const connect = function connect() {
  pool.connect().then((client) => {
    _winston2.default.info('database connection established');
    if (client) {
      seed();
    }
  }).catch(error => error);
};
connect();

const databaseConnection = {
  query: function query(text, params, callback) {
    return pool.query(text, params, callback);
  },
};

exports.default = databaseConnection;
