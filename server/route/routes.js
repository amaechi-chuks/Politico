import express from 'express';
import PartyController from '../controller/PartyController';
import Validate from '../middleware/Validator';
import OfficeController from '../controller/OfficeController';
import UserController from '../controller/UserController';
import AuthenticateUser from '../middleware/AuthenticateUser';
import ValidateUser from '../middleware/ValidateUser';
import CandidateController from '../controller/CandidateController';

const router = express.Router();

// Handle all Post request
router.post('/parties',
  AuthenticateUser.verifyAdmin,
  AuthenticateUser.verifyUser,
  Validate.validateExistingParty,
  Validate.validateHqAddress,
  Validate.validateLogoUrl,
  Validate.validateName,
  PartyController.createParty);

router.post('/offices',
  Validate.validateOfficeType,
  Validate.validateOfficeName,
  Validate.validateExistingOffice,
  OfficeController.createOffice);

router.post('/auth/signup',
  ValidateUser.validateExistingUser,
  ValidateUser.validateLoginDetails,
  ValidateUser.validateProfileDetails,
  UserController.registerUser);

router.post('/auth/signin', ValidateUser.validateLoginDetails,
  UserController.loginUser);

router.post('/candidate', CandidateController.createCandidate);

//  Handle all Get request
router.get('/parties', PartyController.getAllParty);
router.get('/parties/:id', Validate.findById, PartyController.getPartyById);
router.get('/offices', OfficeController.getAllOffice);
router.get('/offices/:id', Validate.findById, OfficeController.getOfficeById);

//  Handle all Patch request
router.patch('/parties/:id/name', Validate.findById, PartyController.updateName);

//  Handles all delete request
router.delete('/parties/:id', Validate.findById, PartyController.deletePartyById);

export default router;
