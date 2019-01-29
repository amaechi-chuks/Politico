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

  /**
       * API method for user login
       * @param {obj} req
       * @param {obj} res
       * @returns {obj} success message
       */
  static userLogin(req, res) {
    const { email, password } = req.body;
    const errors = { form: 'Invalid email or password' };
    const userQuery = 'SELECT * FROM users WHERE email = $1 LIMIT 1;';
    const params = [email];
    databaseConnection.query(userQuery, params)
      .then((dbRes) => {
        if (dbRes.rows[0]) {
          const getPassword = HelperUtils.verifyPassword(password, dbRes.rows[0].password);
          if (getPassword) {
            return HelperUtils.verifyToken(res, 200, 'User login Successfull', dbRes);
          }
          return res.status(401).json({
            succes: false,
            errors,
          });
        }
        return res.status(401).json({
          success: false,
          errors,
        });
      }).catch(error => error(res, 500, errors));
  }
}
export default UserController;
