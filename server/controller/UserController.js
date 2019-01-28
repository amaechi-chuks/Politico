import winston from '../config/winston';
import HelperUtils from '../utility/helperUltis';
import databaseConnection from '../model/databaseConnection';


/**
 * @class UserController
 * @description Specifies which method handles a given request for a specific endpoint
 * @exports UserController
 */

export default class UserController {
  /**
  * @method registerUser
  * @description Registers a user if details are correct
  * @param {object} req - The Request Object
  * @param {object} res - The Response Object
  * @returns {object} JSON API Response
  */
  static registerUser(req, res) {
    const {
      firstName, lastName, otherName,
      email, phoneNumber, password, passportUrl,
    } = req.body;
    const hashedPassword = HelperUtils.hashPassword(password);

    try {
      const query = 'INSERT INTO users(firstname, lastname, othernames, email, phonenumber, password, passportUrl) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *';
      const values = [firstName, lastName,
        otherName, email, phoneNumber,
        hashedPassword, passportUrl];

      databaseConnection.query(query, values, (err, dbRes) => {
        if (err) {
          return res.status(500).json({ status: 500, message: 'Something went wrong with the database.' });
        }
        const userDetails = dbRes.rows[0];
        const { id } = userDetails.id;
        userDetails.email = email;
        const { isadmin } = userDetails.isadmin;

        const token = HelperUtils.generateToken({ id, email, isadmin });
        return res.status(201).json({ status: 201, data: [{ message: 'Registration Successful!', userDetails, token }] });
      });
    } catch (err) {
      winston.info('ops!', err);
    }
  }
}
