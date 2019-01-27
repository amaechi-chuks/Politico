'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _PartyController = require('../controller/PartyController');

var _PartyController2 = _interopRequireDefault(_PartyController);

var _Validator = require('../middleware/Validator');

var _Validator2 = _interopRequireDefault(_Validator);

var _OfficeController = require('../controller/OfficeController');

var _OfficeController2 = _interopRequireDefault(_OfficeController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

// Handle all Post request
router.post('/parties', _Validator2.default.validateHqAddress, _Validator2.default.validateLogoUrl, _Validator2.default.validateName, _PartyController2.default.createParty);
router.post('/offices', _Validator2.default.validateOfficeType, _Validator2.default.validateOfficeName, _OfficeController2.default.createOffice);

//  Handle all Get request
router.get('/parties', _PartyController2.default.getAllParty);
router.get('/parties/:id', _Validator2.default.findById, _PartyController2.default.getPartyById);
router.get('/offices', _OfficeController2.default.getAllOffice);
router.get('/offices/:id', _Validator2.default.findById, _OfficeController2.default.getOfficeById);

//  Handle all Patch request
router.patch('/parties/:id/name', _Validator2.default.findById, _PartyController2.default.updateName);

//  Handles all delete request
router.delete('/parties/:id', _Validator2.default.findById, _PartyController2.default.deletePartyById);

exports.default = router;