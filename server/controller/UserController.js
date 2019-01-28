import winston from '../config/winston';
import HelperUtils from '../utility/helperUltis';
import databaseConnection from '../model/databaseConnection';


/**
 * @class UserController
 * @description Specifies which method handles a given request for a specific endpoint
 * @exports UserController
 */

class UserController {
  /**
  * @method registerUser
  * @description Registers a user if details are correct
  * @param {object} req - The Request Object
  * @param {object} res - The Response Object
  * @returns {object} JSON API Response
  */
  static registerUser(req, res) {
    const {
      firstname, lastname, othername,
      email, phonenumber, password, passporturl,
    } = req.body;
    const hashedPassword = HelperUtils.hashPassword(password);
    
    try {
      const query = 'INSERT INTO users(firstname, lastname, othername, email, phonenumber, password, passporturl) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *';
      const values = [firstname, lastname,
        othername, email, phonenumber,
        hashedPassword, passporturl];
      databaseConnection.query(query, values, (err, dbRes) => {
        if (err) {
          return res.status(500).json({
            status: 500,
            error: 'Something went wrong with the database.',
          });
        }
        const userDetails = dbRes.rows[0];
        const { id, isadmin } = userDetails;
        const token = HelperUtils.generateToken({ id, email, isadmin });
        return res.status(201).json({
          status: 201,
          data: [{ token, userDetails }],
        });
      });
    } catch (err) {
      winston.info('ops!', err);
    }
  }
}
export default UserController;
