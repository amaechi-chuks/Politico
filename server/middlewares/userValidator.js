import HelperUtils from '../utility/helperUltis';
import userDb from '../models/userModels';


/**
 * @class ValidateUser
 * @description Intercepts and validates a given request for user endpoints
 * @exports ValidateUser
 */
export default class ValidateUser {
  /**
     * @method validateProfileDetails
     * @description Validates profile details of the user upon registration
     * @param {object} req - The Request Object
     * @param {object} res - The Response Object
     * @returns {object} JSON API Response
     */
  static validateProfileDetails(req, res, next) {
    const validate = HelperUtils.validate();
    const {
      firstName, lastName, otherName, phoneNumber, passportUrl,
    } = req.body;
    let error;

    if (!validate.name.test(firstName)) {
      error = 'You need to include a valid first name';
    } else if (!validate.name.test(lastName)) {
      error = 'You need to include a valid last name';
    } else if (!validate.phoneNumber.test(phoneNumber)) {
      error = 'You need to include a valid phone number';
    } else if (!passportUrl || !validate.logoUrl.test(passportUrl)) {
      error = 'You need to include a valid passportUrl';
    } else if (otherName && !validate.name.test(otherName)) {
      error = 'The othername you provided is invalid';
    }

    if (error) {
      return res.status(400).json({ status: 400, error });
    }

    return next();
  }

  /**
   * @method validateLoginDetails
   * @description Validates login details (email and password) of a user upon login/registration
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object} JSON API Response
   */
  static validateLoginDetails(req, res, next) {
    const validate = HelperUtils.validate();
    const { email, password } = req.body;
    let error;
    let status;

    if (!validate.email.test(email)) {
      error = 'The email you provided is invalid';
    } else if (!password) {
      error = 'You need to provide a password';
    } else if (password.length < 8) {
      error = 'Password length must be 8 characters and above';
    }

    if (error) {
      status = 400;
      return res.status(status).json({ status, error });
    }
    return next();
  }

  /**
   * @method validateExistingUser
   * @description Validates login details (email and password) of a user upon login/registration
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object} JSON API Response
   */
  static validateExistingUser(req, res, next) {
    const { email, phoneNumber } = req.body;
    if (userDb.email === email || userDb.phoneNumber === phoneNumber) {
      const errorMsg = Object.keys(req.body).join(' or ');
      return res.status(409).json({
        status: 409,
        error: `A user with the given ${errorMsg} already exists`,
      });
    }
    return next();
  }
}
