import express from 'express';
import PartyController from '../controller/PartyController';
import Validate from '../middleware/validate';
import OfficeController from '../controller/OfficeController';

const router = express.Router();

// Handle all Post request
router.post('/parties', Validate.validateHqAddress, Validate.validateLogoUrl, Validate.validateName, PartyController.createParty);
router.post('/offices', Validate.validateOfficeName, Validate.validateOfficeType,
  OfficeController.createOffice);

//  Handle all Get request
router.get('/parties', PartyController.getAllParty);
router.get('/parties/:id', Validate.findPartyById, PartyController.getPartyById);
router.get('/offices', OfficeController.getAllOffice);
router.get('/offices/:id', Validate.findOfficeById, OfficeController.getOfficeById);

//  Handle all Patch request
router.patch('/parties/:id/name', Validate.validateName, PartyController.updateName);

//  Handles all delete request
router.delete('/parties/:id', Validate.findPartyById, PartyController.deletePartyById);
router.delete('/offices/:id', Validate.findOfficeById, OfficeController.deleteOfficeById);

export default router;
