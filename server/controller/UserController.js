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
        const user = dbRes.rows[0];
        const { id, isAdmin } = user;
        const token = HelperUtils.generateToken({ isAdmin, id, email });
        return res.status(201).json({
          status: 201,
          data: [{ token, user }],
        });
      });
    } catch (err) {
      winston.info('ops!', err);
    }
  }


  /**
   * @method loginUser
   * @description Logs in a user if details are correct
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object} JSON API Response
   */
  static loginUser(req, res) {
    const { email, password } = req.body;
    const errors = { form: 'Invalid email or password' };
    const userQuery = 'SELECT * FROM users WHERE email = $1 LIMIT 1;';
    const params = [email];
    databaseConnection.query(userQuery, params)
      .then((dbRes) => {
        if (dbRes.rows[0]) {
          const getPassword = HelperUtils.hashPassword(password, dbRes.rows[0].password);
          if (getPassword) {
            const user = dbRes.rows[0];
            const token = HelperUtils.generateToken(req.body);
            return res.status(200).json({
              status: 200,
              data: [{
                token,
                user,
              }],
            });
          }
          return res.status(401).json({
            status: 401,
            error: errors,
          });
        }
        return errors;
      }).catch(error => error(res, 500, errors));
  }
}
export default UserController;
