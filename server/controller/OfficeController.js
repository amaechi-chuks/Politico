import databaseConnection from '../model/databaseConnection';

/**
 * Class representing OfficeController
 * @class OfficeController
 */
class OfficeController {
  /**
         * @description Create a new political party
         * @param {object} req - The request object
         * @param {object} res - The response object
         * @return {object} JSON representing data object
         * @memberof OfficeController
         */
  static async createOffice(req, res) {
    const {
      type, name,
    } = req.body;
    const createdAt = new Date();

    const query = `
    INSERT INTO office(type, name) VALUES($1, $2) RETURNING *`;
    const params = [type, name];
    try {
      await databaseConnection.query(query, params, (err, dbRes) => {
        if (dbRes) {
          const postId = dbRes.rows[0].id;
          return res.status(201).json({
            status: 201,
            data: [{
              id: postId,
              type,
              name,
              createdAt,
            }],
          });
        }
      });
    } catch (eer) {
      return res.status(500).json({
        status: 500,
        error: 'Something went wrong with the database.',
      });
    }
  }

  /**

   * @description Get all registered Political Office
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @returns {object} JSON object representing data object
   * @memberof OfficeController
   */

  static getAllOffice(req, res) {
    const query = 'SELECT * FROM office';
    databaseConnection.query(query, (err, dbRes) => res.status(200).json({
      status: 200,
      data: dbRes.rows,
    }));
  }

  /**
    *@description Get a registered Political office by id
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @returns {object} {object} JSON object representing data object
   * @memberof OfficeController
   */

  // eslint-disable-next-line consistent-return
  static async getOfficeById(req, res) {
    const { id: postId } = req.params;
    const query = 'SELECT * FROM office WHERE id = $1';
    try {
      // eslint-disable-next-line consistent-return
      await databaseConnection.query(query, [postId], (err, dbRes) => {
        if (dbRes.rowCount > 0) {
          return res.status(200).json({
            status: 200,
            data: dbRes.rows[0],
          });
        }
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: 'Something went wrong with the database',
      });
    }
  }

  /**
   *
   *
   * @static
   * @param {Object} req  The request object
   * @param {Object} res The response object
   * @returns {Object} JSON object representing the data
   * @memberof OfficeController
   */
  // eslint-disable-next-line consistent-return
  static async getOfficeResultById(req, res) {
    const { id: postId } = req.params;
    const query = 'SELECT office, candidate, count(candidate) as results FROM vote WHERE vote.office = $1 GROUP BY vote.candidate, vote.office';
    try {
      // eslint-disable-next-line consistent-return
      await databaseConnection.query(query, [postId], (err, dbRes) => {
        if (dbRes) {
          return res.status(200).json({
            status: 200,
            data: dbRes.rows,
          });
        }
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: 'Something went wrong with the database',
      });
    }
  }
}
export default OfficeController;
