

Object.defineProperty(exports, '__esModule', {
  value: true,
});

const _createClass = (function () { function defineProperties(target, props) { for (let i = 0; i < props.length; i++) { const descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }());

const _dotenv = require('dotenv');

const _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

_dotenv2.default.config();

const HelperUtils = (function () {
  function HelperUtils() {
    _classCallCheck(this, HelperUtils);
  }

  _createClass(HelperUtils, null, [{
    key: 'validate',
    value: function validate() {
      return {
        name: /^[a-zA-Z_ ]+$/,
        email: /^([A-z0-9]+)([._-]{0,1})([A-z0-9]+)@([A-z0-9-_.]+)\.([A-z]{2,3})$/,
        phoneNumber: /^[+\d\-\s]+$/,
        location: /^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/,
        hqAddress: /^[a-zA-Z0-9\s,'-]*$/,
        logoUrl: /\.(gif|jpg|jpeg|tiff|png|mp4)$/i,
        type: /(federal|legislative|state|local government)$/i,
      };
    },
  }]);

  return HelperUtils;
}());

exports.default = HelperUtils;
