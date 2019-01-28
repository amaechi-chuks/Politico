

Object.defineProperty(exports, '__esModule', {
  value: true,
});

const _createClass = (function () { function defineProperties(target, props) { for (let i = 0; i < props.length; i++) { const descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }());

const _partyModel = require('../model/partyModel');

const _partyModel2 = _interopRequireDefault(_partyModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

/**
 * Class representing PartyController
 * @class PartyController
 */
const PartyController = (function () {
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
      const _req$body = req.body;


      const name = _req$body.name;


      const hqAddress = _req$body.hqAddress;


      const logoUrl = _req$body.logoUrl;

      const id = _partyModel2.default[_partyModel2.default.length - 1].id + 1;
      const registerdAt = new Date();
      const newParty = {
        id,
        name,
        hqAddress,
        logoUrl,
        registerdAt,
      };
      if (newParty) {
        _partyModel2.default.push(newParty);
        return res.status(201).json({
          status: 201,
          data: [newParty],
        });
      }
      return res.status(400).json({
        status: 400,
        error: 'Bad request',
      });
    },

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
        data: _partyModel2.default,
      });
    },

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
      const data = _partyModel2.default.filter(partyObj => Number(req.params.id) === partyObj.id);
      res.status(200).json({
        status: 200,
        data,
      });
    },

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
      const id = Number(req.params.id);
      const name = req.body.name;

      const partyToUpdate = _partyModel2.default.find(partyObj => partyObj.id === id);
      if (req.body.name === undefined) {
        return res.status(404).json({
          status: 404,
          error: 'Party name must be specified',
        });
      }
      const partyIndex = _partyModel2.default.indexOf(partyToUpdate);
      partyToUpdate.name = name;
      _partyModel2.default[partyIndex] = partyToUpdate;
      return res.status(200).json({
        status: 200,
        data: [{ id, name }],
      });
    },

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
      const id = Number(req.params.id);
      const partyToDelete = _partyModel2.default.find(party => party.id === id);
      // Get the index of the object to delete
      const objId = _partyModel2.default.indexOf(partyToDelete);
      // Using the object index, splice the object out of the partiesDb
      _partyModel2.default.splice(objId, 1);
      if (partyToDelete) {
        return res.status(200).json({
          status: 200,
          data: [{
            id,
            message: 'Party record has been deleted',
          }],
        });
      }
      return res.status(404).json({
        status: 404,
        error: 'Such id does not exist',
      });
    },
  }]);

  return PartyController;
}());

exports.default = PartyController;
