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
  // eslint-disable-next-line consistent-return
  static async registerUser(req, res) {
    const {
      firstname, lastname, othername,
      email, phonenumber, password,
    } = req.body;
    const hashedPassword = HelperUtils.hashPassword(password);

    try {
      const query = 'INSERT INTO users(firstname, lastname, othername, email, phonenumber, password) VALUES($1, $2, $3, $4, $5, $6) RETURNING *';
      const values = [firstname, lastname,
        othername, email, phonenumber,
        hashedPassword];
      await databaseConnection.query(query, values, (err, dbRes) => {
        const user = dbRes.rows[0];
        const { id, isAdmin } = user;
        const token = HelperUtils.generateToken({ isAdmin, id, email });
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
      // eslint-disable-next-line consistent-return
      .then((dbRes) => {
        if (dbRes.rows[0]) {
          const getPassword = HelperUtils.verifyPassword(password, dbRes.rows[0].password);
          if (getPassword) {
            const user = dbRes.rows[0];
            const { id, firstname, isadmin } = user;
            const token = HelperUtils.generateToken({
              id, firstname, isadmin, email,
            });
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
}
export default UserController;
