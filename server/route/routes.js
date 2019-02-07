import express from 'express';
import PartyController from '../controller/PartyController';
import Validate from '../middleware/Validator';
import OfficeController from '../controller/OfficeController';
import UserController from '../controller/UserController';
import AuthenticateUser from '../middleware/AuthenticateUser';
import ValidateUser from '../middleware/ValidateUser';
import CandidateController from '../controller/CandidateController';
import VoteController from '../controller/VoteController';


const router = express.Router();

// Handle all Post request
router.post('/parties',
  AuthenticateUser.verifyAdmin,
  Validate.validateIfExist,
  Validate.validateHqAddress,
  Validate.validateLogoUrl,
  Validate.validateName,
  PartyController.createParty);

router.post('/offices',
  AuthenticateUser.verifyAdmin,
  Validate.validateIfExist,
  Validate.validateOfficeType,
  Validate.validateName,
  OfficeController.createOffice);

router.post('/auth/signup',
  ValidateUser.validateProfileDetails,
  ValidateUser.validateExistingUser,
  ValidateUser.validateExistingNumber,
  UserController.registerUser);

router.post('/auth/login', ValidateUser.validateLoginDetails,
  UserController.loginUser);

router.post('/office/:id/register',
  AuthenticateUser.verifyAdmin,
  Validate.validateExistingCandidate,
  CandidateController.createCandidate);

router.post('/votes', AuthenticateUser.verifyUser, Validate.validateCandidacy, VoteController.createVote);

//  Handle all Get request
router.get('/parties', AuthenticateUser.verifyUser, PartyController.getAllParty);
router.get('/parties/:id', AuthenticateUser.verifyUser, Validate.findById, PartyController.getPartyById);
router.get('/offices', AuthenticateUser.verifyUser, OfficeController.getAllOffice);
router.get('/offices/:id', AuthenticateUser.verifyUser, Validate.findById, OfficeController.getOfficeById);
router.get('/office/:id/result', AuthenticateUser.verifyUser, OfficeController.getOfficeResultById, OfficeController.getOfficeResultById);

//  Handle all Patch request
router.patch('/parties/:id/name', AuthenticateUser.verifyAdmin,
  AuthenticateUser.verifyUser, Validate.findById, PartyController.updateName);

//  Handles all delete request
router.delete('/parties/:id', AuthenticateUser.verifyAdmin,
  AuthenticateUser.verifyUser, Validate.findById, PartyController.deletePartyById);

export default router;
