'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _partyModel = require('../model/partyModel');

var _partyModel2 = _interopRequireDefault(_partyModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Class representing PartyController
 * @class PartyController
 */
var PartyController = function () {
  function PartyController() {
    _classCallCheck(this, PartyController);
  }

  _createClass(PartyController, null, [{
    key: 'createParty',

    /**
         * @description Create a new political party
         * @param {object} req - The request object
         * @param {object} res - The response object
         * @return {object} JSON representing data object
         * @memberof createParty
         */
    value: function createParty(req, res) {
      var _req$body = req.body,
          name = _req$body.name,
          hqAddress = _req$body.hqAddress,
          logoUrl = _req$body.logoUrl;

      var id = _partyModel2.default[_partyModel2.default.length - 1].id + 1;
      var registerdAt = new Date();
      var newParty = {
        id: id,
        name: name,
        hqAddress: hqAddress,
        logoUrl: logoUrl,
        registerdAt: registerdAt
      };
      if (newParty) {
        _partyModel2.default.push(newParty);
        return res.status(201).json({
          status: 201,
          data: [newParty]
        });
      }
      return res.status(400).json({
        status: 400,
        error: 'Bad request'
      });
    }

    /**
     * @description Get all registered Political party
     * @param {object} req - The request object
     * @param {object} res - The response object
     * @returns {object} JSON object representing data object
     * @memberof getAllParty
     */

  }, {
    key: 'getAllParty',
    value: function getAllParty(req, res) {
      return res.status(200).json({
        status: 200,
        data: _partyModel2.default
      });
    }

    /**
     * @description Get a registered Political party by id
     * @param {object} req - The request object
     * @param {object} res - The response object
     * @returns {object} {object} JSON object representing data object
     * @memberof getPartyById
     */

  }, {
    key: 'getPartyById',
    value: function getPartyById(req, res) {
      var data = _partyModel2.default.filter(function (partyObj) {
        return Number(req.params.id) === partyObj.id;
      });
      res.status(200).json({
        status: 200,
        data: data
      });
    }

    /**
     * @description PATCH a registered Political party by name
     * @param {object} req - The request object
     * @param {object} res - The response object
     * @returns {object} {object} JSON object representing data object
     * @memberof updateName
     */

  }, {
    key: 'updateName',
    value: function updateName(req, res) {
      var id = Number(req.params.id);
      var name = req.body.name;

      var partyToUpdate = _partyModel2.default.find(function (partyObj) {
        return partyObj.id === id;
      });
      if (req.body.name === undefined) {
        return res.status(404).json({
          status: 404,
          error: 'Party name must be specified'
        });
      }
      var partyIndex = _partyModel2.default.indexOf(partyToUpdate);
      partyToUpdate.name = name;
      _partyModel2.default[partyIndex] = partyToUpdate;
      return res.status(200).json({
        status: 200,
        data: [{ id: id, name: name }]
      });
    }

    /**
     * @description Delete a registered Political party by id
     * @param {object} req - The request object
     * @param {object} res - The response object
     * @returns {object} {object} JSON object representing data object
     * @memberof deletePartyById
     */

  }, {
    key: 'deletePartyById',
    value: function deletePartyById(req, res) {
      var id = Number(req.params.id);
      var partyToDelete = _partyModel2.default.find(function (party) {
        return party.id === id;
      });
      // Get the index of the object to delete
      var objId = _partyModel2.default.indexOf(partyToDelete);
      // Using the object index, splice the object out of the partiesDb
      _partyModel2.default.splice(objId, 1);
      if (partyToDelete) {
        return res.status(200).json({
          status: 200,
          data: [{
            id: id,
            message: 'Party record has been deleted'
          }]
        });
      }
      return res.status(404).json({
        status: 404,
        error: 'Such id does not exist'
      });
    }
  }]);

  return PartyController;
}();

exports.default = PartyController;