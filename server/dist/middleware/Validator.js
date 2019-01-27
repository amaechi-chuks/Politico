'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _helperUltis = require('../utility/helperUltis');

var _helperUltis2 = _interopRequireDefault(_helperUltis);

var _partyModel = require('../model/partyModel');

var _partyModel2 = _interopRequireDefault(_partyModel);

var _officeModel = require('../model/officeModel');

var _officeModel2 = _interopRequireDefault(_officeModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @class Validate
 * @description Intercepts and validates a given request for parties endpoints
 * @exports Validate
 */

var Validate = function () {
  function Validate() {
    _classCallCheck(this, Validate);
  }

  _createClass(Validate, null, [{
    key: 'findById',

    /**
           * @description Get a specific party by id
           * @param {object} req - The request object
           * @param {object} res - The response object
           * @param {function} next - Calls the next function
           * @returns {object} JSON representing the failure message
           * @memberof findById
           */
    value: function findById(req, res, next) {
      var id = req.params.id;

      if (!Number(id)) {
        return res.status(400).json({
          status: 400,
          error: 'Such endpoint does not exist'
        });
      }
      var foundParty = _partyModel2.default.find(function (party) {
        return party.id === Number(id);
      });
      // const foundOffice = officeDb.find(party => party.id === Number(id));
      if (!foundParty) {
        return res.status(404).json({
          status: 404,
          error: 'Id does not exist'
        });
      }
      return next();
    }

    /**
        * @method validateName
        * @description Validates the set of name passed in the request body
        * @param {object} req - The Request Object
        * @param {object} res - The Response Object
        * @returns {object} JSON API Response
        */

  }, {
    key: 'validateName',
    value: function validateName(req, res, next) {
      var validate = _helperUltis2.default.validate();
      var error = '';
      var name = req.body.name;

      if (!validate.name.test(name)) {
        error = 'Invalid party name';
      }
      if (!name || name === undefined) {
        error = 'Party name must be specified';
      }
      var duplicatName = _partyModel2.default.find(function (party) {
        return party.name === name;
      });
      if (duplicatName) {
        error = 'Party name already exist';
      }
      if (error) {
        return res.status(404).json({
          status: 404, error: error
        });
      }

      return next();
    }

    /**
        * @method validateOfficeName
        * @description Validates the set of name passed in the request body
        * @param {object} req - The Request Object
        * @param {object} res - The Response Object
        * @returns {object} JSON API Response
        */

  }, {
    key: 'validateOfficeName',
    value: function validateOfficeName(req, res, next) {
      var validate = _helperUltis2.default.validate();
      var error = '';
      var name = req.body.name;

      if (!validate.name.test(name)) {
        error = 'Office name must be valid';
      }
      if (!name || name === undefined) {
        error = 'Office name must be specified';
      }
      var duplicatOfficeName = _officeModel2.default.find(function (office) {
        return office.name === name;
      });
      if (duplicatOfficeName) {
        error = 'Office name already exist';
      }
      if (error) {
        return res.status(404).json({
          status: 404, error: error
        });
      }

      return next();
    }

    /**
       * @method validateHqAddress
       * @description Ensures HqAddress is not empty or has character length of >= 10
       * @param {object} req - The Request Object
       * @param {object} res - The Response Object
       * @returns {object} JSON API Response
       */

  }, {
    key: 'validateHqAddress',
    value: function validateHqAddress(req, res, next) {
      var validate = _helperUltis2.default.validate();
      var error = '';
      var hqAddress = req.body.hqAddress;


      if (!validate.hqAddress.test(hqAddress)) {
        error = 'Invalid hqAddress format';
      } else if (!hqAddress || hqAddress === undefined) {
        error = 'hqAddress must be specified';
      }
      if (error) {
        return res.status(400).json({ status: 400, error: error });
      }
      return next();
    }

    /**
      * @method validateLogoUrl
      * @description Validates LogoUrl passed in the request body
      * @param {object} req - The Request Object
      * @param {object} res - The Response Object
      * @returns {object} JSON API Response
      */

  }, {
    key: 'validateLogoUrl',
    value: function validateLogoUrl(req, res, next) {
      var validate = _helperUltis2.default.validate();
      var error = '';
      var logoUrl = req.body.logoUrl;


      if (!validate.logoUrl.test(logoUrl)) {
        error = 'Invalid party logo';
      }
      if (!logoUrl || logoUrl === undefined) {
        error = 'Party Logo must be specified';
      }
      if (error) {
        return res.status(400).json({
          status: 400,
          error: error
        });
      }

      return next();
    }

    /**
      * @method validateOfficeType
      * @description Validates Office type passed in the request body
      * @param {object} req - The Request Object
      * @param {object} res - The Response Object
      * @returns {object} JSON API Response
      */

  }, {
    key: 'validateOfficeType',
    value: function validateOfficeType(req, res, next) {
      var validate = _helperUltis2.default.validate();
      var error = '';
      var type = req.body.type;

      if (!validate.type.test(type)) {
        error = 'Invalid office type';
      }
      if (!type || type === undefined) {
        error = 'Type must be specified';
      }
      if (error) {
        return res.status(404).json({
          status: 404, error: error
        });
      }
      return next();
    }
  }]);

  return Validate;
}();

exports.default = Validate;