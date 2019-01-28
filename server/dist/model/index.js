

const _databaseConnection = require('./databaseConnection');

const _databaseConnection2 = _interopRequireDefault(_databaseConnection);

const _dropTable = require('./dropTable');

const _dropTable2 = _interopRequireDefault(_dropTable);

const _createTable = require('./createTable');

const _createTable2 = _interopRequireDefault(_createTable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const queries = `${_dropTable2.default}${_createTable2.default}`;

_databaseConnection2.default.query(queries, () => {
  _databaseConnection2.default.end();
});
