'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _officeModel = require('../model/officeModel');

var _officeModel2 = _interopRequireDefault(_officeModel);

var _databaseConnection = require('../model/databaseConnection');

var _databaseConnection2 = _interopRequireDefault(_databaseConnection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Class representing OfficeController
 * @class OfficeController
 */
var OfficeController = function () {
  function OfficeController() {
    _classCallCheck(this, OfficeController);
  }

  _createClass(OfficeController, null, [{
    key: 'createOffice',

    /**
           * @description Create a new political party
           * @param {object} req - The request object
           * @param {object} res - The response object
           * @return {object} JSON representing data object
           * @memberof createOffice
           */
    value: function createOffice(req, res) {
      var _req$body = req.body,
          type = _req$body.type,
          name = _req$body.name;

      var id = _officeModel2.default[_officeModel2.default.length - 1].id + 1;
      var registerdAt = new Date();
      var updatedAlt = new Date();
      var newOffice = {
        id: id, type: type, name: name, registerdAt: registerdAt, updatedAlt: updatedAlt
      };
      if (newOffice) {
        _officeModel2.default.push(newOffice);
        return res.status(201).json({
          status: 201,
          data: [newOffice]
        });
      }
      return res.status(400).json({
        status: 400,
        error: 'Bad request'
      });
    }

    /**
      * @description Get all registered Political Office
     * @param {object} req - The request object
     * @param {object} res - The response object
     * @returns {object} JSON object representing data object
     * @memberof getAllOffice
     */

  }, {
    key: 'getAllOffice',
    value: function getAllOffice(req, res) {
      return res.status(200).json({
        status: 200,
        data: _officeModel2.default
      });
    }

    /**
      *@description Get a registered Political office by id
     * @param {object} req - The request object
     * @param {object} res - The response object
     * @returns {object} {object} JSON object representing data object
     * @memberof getOfficeById
     */

  }, {
    key: 'getOfficeById',
    value: function getOfficeById(req, res) {
      var data = _officeModel2.default.filter(function (OfficeObj) {
        return Number(req.params.id) === OfficeObj.id;
      });
      if (data) {
        return res.status(200).json({
          status: 200,
          data: data
        });
      }
      return res.status(404).json({
        status: 404,
        error: 'id does not exist'
      });
    }
  }]);

  return OfficeController;
}();

exports.default = OfficeController;