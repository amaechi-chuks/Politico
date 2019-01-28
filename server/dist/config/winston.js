

Object.defineProperty(exports, '__esModule', {
  value: true,
});

const _appRootPath = require('app-root-path');

const _appRootPath2 = _interopRequireDefault(_appRootPath);

const _winston = require('winston');

const _winston2 = _interopRequireDefault(_winston);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const tsFormat = function tsFormat() {
  return new Date().toLocaleTimeString();
};
const options = {
  file: {
    timestamp: tsFormat,
    level: 'info',
    filename: `${_appRootPath2.default}/logs/app.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880,
    maxFiles: 5,
    colorize: false,
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true,
  },
};

const logger = _winston2.default.createLogger({
  transports: [new _winston2.default.transports.File(options.file), new _winston2.default.transports.Console(options.console)],
  exitOnError: false,
});

logger.stream = {
  write: function write(message, encoding) {
    logger.info(message, encoding);
  },
};
exports.default = logger;
