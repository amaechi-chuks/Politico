import express from 'express';
import PartiesController from '../controllers/partyControllers';
import ValidateParties from '../middlewares/validateParties';
import OfficesController from '../controllers/officeControllers';

const router = express.Router();

// Handle all Post request
router.post('/parties', ValidateParties.validateHqAddress, ValidateParties.validateLogoUrl, ValidateParties.validateName, PartiesController.createParties);
router.post('/offices', ValidateParties.validateName, ValidateParties.validateOfficeType,
  OfficesController.createOffice);

//  Handle all Get request
router.get('/parties', PartiesController.getAllParties);
router.get('/parties/:id', ValidateParties.findPartiesById, PartiesController.getPartyById);

//  Handle all Patch request
router.patch('/parties/:id/name', ValidateParties.validateName, PartiesController.updateName);

//  Handles all delete request
router.delete('/parties/:id', ValidateParties.findPartiesById, PartiesController.deletePartyById);

export default router;
