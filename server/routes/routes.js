import express from 'express';
import PartiesController from '../controllers/partyControllers';
import ValidateParties from '../middlewares/validateParties';

const router = express.Router();

router.post('/parties',
  ValidateParties.validateHqAddress,
  ValidateParties.validateLogoUrl,
  ValidateParties.validateName,
  PartiesController.createParties);

router.get('/parties', PartiesController.getAllParties);

router.get('/parties/:id', ValidateParties.findPartiesById,
  PartiesController.getPartyById);

export default router;
