import express from 'express';
import PartyController from '../controller/PartyController';
import ValidateParty from '../middleware/ValidateParty';
import OfficeController from '../controller/OfficeController';

const router = express.Router();

// Handle all Post request
router.post('/parties', ValidateParty.validateHqAddress, ValidateParty.validateLogoUrl, ValidateParty.validateName, PartyController.createParty);
router.post('/offices', ValidateParty.validateName, ValidateParty.validateOfficeType,
  OfficeController.createOffice);

//  Handle all Get request
router.get('/parties', PartyController.getAllParty);
router.get('/parties/:id', ValidateParty.findPartyById, PartyController.getPartyById);

//  Handle all Patch request
router.patch('/parties/:id/name', ValidateParty.validateName, PartyController.updateName);

//  Handles all delete request
router.delete('/parties/:id', ValidateParty.findPartyById, PartyController.deletePartyById);

export default router;
