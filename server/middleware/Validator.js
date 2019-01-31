import HelperUtils from '../utility/helperUltis';
import databaseConnection from '../model/databaseConnection';

/**
 * @class Validate
 * @description Intercepts and validates a given request for parties endpoints
 * @exports Validate
 */

class Validate {
  /**
         * @description Get a specific party by id
         * @param {object} req - The request object
         * @param {object} res - The response object
         * @param {function} next - Calls the next function
         * @returns {object} JSON representing the failure message
         * @memberof findById
         */
  static findById(req, res, next) {
    if (Number.isNaN(Number(req.params.id))) {
      return res.status(404).json({ status: 404, error: 'The id parameter must be a number' });
    }

    const query = 'SELECT * FROM incidents WHERE id = $1';
    return databaseConnection.query(query, [req.params.id], (err, dbRes) => {
      try {
        if (err) {
          return res.status(404).json({ status: 404, error: 'Sorry, no record with such id' });
        }
        req.postId = dbRes.rows[0].id;
        return next();
        // eslint-disable-next-line no-empty
      } catch (err) {
        return res.status(404).json({ status: 404, error: 'Sorry, no record with such id' });
      }
    });
  }

  /**
      * @method validateName
      * @description Validates the set of name passed in the request body
      * @param {object} req - The Request Object
      * @param {object} res - The Response Object
      * @returns {object} JSON API Response
      */
  static validateName(req, res, next) {
    const validate = HelperUtils.validate();
    let error = '';
    const { name } = req.body;
    if (!validate.name.test(name)) {
      error = 'Invalid party name';
    }
    if (!name || name === undefined) {
      error = 'Party name must be specified';
    }
    if (error) {
      return res.status(404).json({
        status: 404, error,
      });
    }

    return next();
  }

  /**
      * @method validateOfficeName
      * @description Validates the set of name passed in the request body
      * @param {object} req - The Request Object
      * @param {object} res - The Response Object
      * @returns {object} JSON API Response
      */
  static validateOfficeName(req, res, next) {
    const validate = HelperUtils.validate();
    let error = '';
    const { name } = req.body;
    if (!validate.name.test(name)) {
      error = 'Office name must be valid';
    }
    if (!name || name === undefined) {
      error = 'Office name must be specified';
    }
    if (error) {
      return res.status(404).json({
        status: 404, error,
      });
    }

    return next();
  }


  /**
     * @method validateHqAddress
     * @description Ensures HqAddress is not empty or has character length of >= 10
     * @param {object} req - The Request Object
     * @param {object} res - The Response Object
     * @returns {object} JSON API Response
     */
  static validateHqAddress(req, res, next) {
    const validate = HelperUtils.validate();
    let error = '';
    const { hqAddress } = req.body;

    if (!validate.hqAddress.test(hqAddress)) {
      error = 'Invalid hqAddress format';
    } else if (!hqAddress || hqAddress === undefined) {
      error = 'hqAddress must be specified';
    }
    if (error) {
      return res.status(400).json({ status: 400, error });
    }
    return next();
  }

  /**
    * @method validateLogoUrl
    * @description Validates LogoUrl passed in the request body
    * @param {object} req - The Request Object
    * @param {object} res - The Response Object
    * @returns {object} JSON API Response
    */
  static validateLogoUrl(req, res, next) {
    const validate = HelperUtils.validate();
    let error = '';
    const { logoUrl } = req.body;

    if (!validate.logoUrl.test(logoUrl)) {
      error = 'Invalid party logo';
    }
    if (!logoUrl || logoUrl === undefined) {
      error = 'Party Logo must be specified';
    }
    if (error) {
      return res.status(400).json({
        status: 400,
        error,
      });
    }

    return next();
  }

  /**
    * @method validateOfficeType
    * @description Validates Office type passed in the request body
    * @param {object} req - The Request Object
    * @param {object} res - The Response Object
    * @returns {object} JSON API Response
    */
  static validateOfficeType(req, res, next) {
    const validate = HelperUtils.validate();
    let error = '';
    const { type } = req.body;
    if (!validate.type.test(type)) {
      error = 'Invalid office type';
    }
    if (!type || type === undefined) {
      error = 'Type must be specified';
    }
    if (error) {
      return res.status(404).json({
        status: 404, error,
      });
    }
    return next();
  }

  /**
   * @method validateExistingParty
   * @description Validates already existing party
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object} JSON API Response
   */
  static validateExistingParty(req, res, next) {
    const party = {
      text: 'SELECT * FROM party WHERE name = $1;',
      values: [req.body.name],
    };
    return databaseConnection.query(party, (error, dbRes) => {
      if (dbRes.rows[0]) {
        return res.status(409).json({
          status: 409,
          error: 'party name already exist',
        });
      }
      return next();
    });
  }

  /**
   * @method validateExistingOffice
   * @description Validates user login/registration
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object} JSON API Response
   */
  static validateExistingOffice(req, res, next) {
    const officeName = {
      text: 'SELECT * FROM office WHERE name = $1;',
      values: [req.body.name],
    };
    return databaseConnection.query(officeName, (error, dbRes) => {
      if (dbRes.rows[0]) {
        return res.status(409).json({
          status: 409,
          error: 'Office name already exist',
        });
      }
      return next();
    });
  }

  /**
   * @method validateExistingVote
   * @description Validates users vote
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object} JSON API Response
   */
  static validateExistingVote(req, res, next) {
    const userVote = {
      text: 'SELECT * FROM vote WHERE candidate = $1;',
      values: [req.body.candidate],
    };
    return databaseConnection.query(userVote, (error, dbRes) => {
      if (dbRes.rows[0]) {
        return res.status(409).json({
          status: 409,
          error: 'User voters Id already exist',
        });
      }
      return next();
    });
  }

  /**
   * @method validateExistingCandidate
   * @description Validates candidates
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object} JSON API Response
   */
  static validateExistingCandidate(req, res, next) {
    const candidate = {
      text: 'SELECT * FROM candidate WHERE candidate = $1;',
      values: [req.body.candidate],
    };
    return databaseConnection.query(candidate, (error, dbRes) => {
      if (dbRes.rows[0]) {
        return res.status(409).json({
          status: 409,
          error: 'Candidate with Id already exist',
        });
      }
      return next();
    });
  }
}
export default Validate;
