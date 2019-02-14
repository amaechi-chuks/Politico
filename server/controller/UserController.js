/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
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
  static async registerUser(req, res) {
    const {
      firstName, lastName, otherName,
      email, phoneNumber, password,
    } = req.body;
    const hashedPassword = HelperUtils.hashPassword(password);
    try {
      const query = 'INSERT INTO users(firstName, lastName, otherName, email, phoneNumber, password) VALUES($1, $2, $3, $4, $5, $6) RETURNING *';
      const values = [firstName, lastName,
        otherName, email, phoneNumber,
        hashedPassword];
      await databaseConnection.query(query, values, (err, dbRes) => {
        const user = dbRes.rows[0];
        const { id, isadmin } = user;
        const token = HelperUtils.generateToken({ isadmin, id, email });
        delete dbRes.rows[0].password;
        return res.status(201).json({
          status: 201,
          data: [{ token, user }],
        });
      });
    } catch (err) {
      return res.status(500).json({
        status: 500,
        error: 'Something went wrong with the database.',
      });
    }
  }

  /**
   * @method loginUser
   * @description Logs in a user if details are correct
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object} JSON API Response
   */
  static async loginUser(req, res) {
    const { email, password } = req.body;
    const userQuery = 'SELECT * FROM users WHERE email = $1 LIMIT 1;';
    const params = [email];
    databaseConnection.query(userQuery, params)
      .then((dbRes) => {
        if (dbRes.rows[0]) {
          const getPassword = HelperUtils.verifyPassword(password, dbRes.rows[0].password);
          if (getPassword) {
            const user = dbRes.rows[0];
            const { id, firstName, isadmin } = user;
            const token = HelperUtils.generateToken({
              id, firstName, isadmin, email,
            });
            delete dbRes.rows[0].password;
            return res.status(200).json({
              status: 200,
              data: [{
                token,
                user,
              }],
            });
          }
        }
      }).catch(() => res.status(404).json({
        status: 404,
        error: 'User does not exist',
      }));
  }

  /**
   * @description Get a user by id
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @returns {object} {object} JSON object representing data object
   * @memberof fetchUser
   */
  static async fetchUser(req, res) {
    const { id: postId } = req.params;
    const query = 'SELECT * FROM users WHERE id = $1';
    try {
      await databaseConnection.query(query, [postId], (err, dbRes) => {
        if (dbRes.rowCount > 0) {
          delete dbRes.rows[0].password;
          return res.status(200).json({
            status: 200,
            data: dbRes.rows[0],
          });
        }
        return res.status(404).json({
          status: 404,
          error: 'User does not exist',
        });
      });
    } catch (err) {
      return res.status(500).json({
        status: 500,
        error: 'sorry, something went wrong with the database',
      });
    }
  }
}
export default UserController;
