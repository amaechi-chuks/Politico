import express from 'express';
import PartyController from '../controller/PartyController';
import Validate from '../middleware/Validator';
import OfficeController from '../controller/OfficeController';
import UserController from '../controller/UserController';
import AuthenticateUser from '../middleware/AuthenticateUser';
import ValidateUser from '../middleware/ValidateUser';
import CandidateController from '../controller/CandidateController';
import VoteController from '../controller/VoteController';
import InterestController from '../controller/InterestController';
import middleware from '../middleware/upload';


const router = express.Router();

// Handle all Post request
router.post('/parties',
  Validate.validateIfPartyExist,
  Validate.validateIfPartyLogoExist,
  Validate.validateHqAddress,
  Validate.validateLogoUrl,
  Validate.validateName,
  PartyController.createParty);

router.post('/profile_pic',
  AuthenticateUser.verifyUser, middleware.updateUserPic);

router.post('/offices',
  Validate.validateIfOfficeExist,
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

router.post('/interest/:id', InterestController.indicateInterest);

router.post('/office/:id/register',
  AuthenticateUser.verifyAdmin,
  Validate.validateExistingCandidate,
  CandidateController.createCandidate);

router.post('/votes', Validate.validateCandidacy, VoteController.createVote);

//  Handle all Get request
router.get('/parties', PartyController.getAllParty);
router.get('/parties/:id', AuthenticateUser.verifyUser, Validate.findById, PartyController.getPartyById);
router.get('/offices', OfficeController.getAllOffice);
router.get('/offices/:id', Validate.findById, OfficeController.getOfficeById);
router.get('/office/:id/result', OfficeController.getOfficeResultById);
router.get('/auth/user/:id', AuthenticateUser.verifyUser, UserController.fetchUser);
router.get('/interest', InterestController.fetchAllInterestedUsers);
router.get('/interest/:id', InterestController.fetchInterestedUserById);

//  Handle all Patch request
router.patch('/parties/:id', Validate.validateName, Validate.findById, PartyController.updateName);

//  Handles all delete request
router.delete('/parties/:id', Validate.findById, PartyController.deletePartyById);

export default router;
