'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _appRootPath = require('app-root-path');

var _appRootPath2 = _interopRequireDefault(_appRootPath);

var _winston = require('winston');

var _winston2 = _interopRequireDefault(_winston);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tsFormat = function tsFormat() {
  return new Date().toLocaleTimeString();
};
var options = {
  file: {
    timestamp: tsFormat,
    level: 'info',
    filename: _appRootPath2.default + '/logs/app.log',
    handleExceptions: true,
    json: true,
    maxsize: 5242880,
    maxFiles: 5,
    colorize: false
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true
  }
};

var logger = _winston2.default.createLogger({
  transports: [new _winston2.default.transports.File(options.file), new _winston2.default.transports.Console(options.console)],
  exitOnError: false
});

logger.stream = {
  write: function write(message, encoding) {
    logger.info(message, encoding);
  }
};
exports.default = logger;