'use strict';

var _databaseConnection = require('./databaseConnection');

var _databaseConnection2 = _interopRequireDefault(_databaseConnection);

var _dropTable = require('./dropTable');

var _dropTable2 = _interopRequireDefault(_dropTable);

var _createTable = require('./createTable');

var _createTable2 = _interopRequireDefault(_createTable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var queries = '' + _dropTable2.default + _createTable2.default;

_databaseConnection2.default.query(queries, function () {
  _databaseConnection2.default.end();
});