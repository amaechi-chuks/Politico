

Object.defineProperty(exports, '__esModule', {
  value: true,
});

const _express = require('express');

const _express2 = _interopRequireDefault(_express);

const _bodyParser = require('body-parser');

const _bodyParser2 = _interopRequireDefault(_bodyParser);

const _cors = require('cors');

const _cors2 = _interopRequireDefault(_cors);

const _routes = require('./route/routes');

const _routes2 = _interopRequireDefault(_routes);

const _winston = require('./config/winston');

const _winston2 = _interopRequireDefault(_winston);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Create a top level instance of express
const app = (0, _express2.default)();

app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: true }));

const port = process.env.PORT || 6000;

app.use((0, _cors2.default)());
app.get('/', (req, res) => res.status(200).json({
  status: 200,
  message: 'Welcome to Politico',
}));

app.use('/api/v1/', _routes2.default);

app.all('*', (req, res) => res.status(404).json({
  status: 404,
  error: 'Wrong endpoint. Such endpoint does not exist',
}));

app.listen(port, () => {
  _winston2.default.info(`Server is live on PORT\uD83D\uDC4D : ${port}`);
});

exports.default = app;
