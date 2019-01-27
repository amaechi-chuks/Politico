'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _pg = require('pg');

var _pg2 = _interopRequireDefault(_pg);

var _winston = require('../config/winston');

var _winston2 = _interopRequireDefault(_winston);

var _createTable = require('./createTable');

var _createTable2 = _interopRequireDefault(_createTable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Pool = _pg2.default.Pool;

_dotenv2.default.config();

var pool = new Pool();

var seed = function seed() {
  var qry = _createTable2.default;
  pool.query(qry, function (err, dbRes) {
    if (err) {
      _winston2.default.info(err.toString());
    } else {
      _winston2.default.info(dbRes);
    }
  });
};

var connect = function connect() {
  pool.connect().then(function (client) {
    _winston2.default.info('database connection established');
    if (client) {
      seed();
    }
  }).catch(function (error) {
    return error;
  });
};
connect();

var databaseConnection = {
  query: function query(text, params, callback) {
    return pool.query(text, params, callback);
  }
};

exports.default = databaseConnection;