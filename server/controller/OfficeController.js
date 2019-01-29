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
         * @memberof createOffice
         */
  static createOffice(req, res) {
    const {
      type, name,
    } = req.body;
    const createdAt = new Date();

    const query = `
    INSERT INTO office(type, name) VALUES($1, $2) RETURNING *`;
    const params = [type, name];

    databaseConnection.query(query, params, (err, dbRes) => {
      if (err) {
        return res.status(500).json({
          status: 500,
          error: 'Something went wrong with the database.',
        });
      }
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
    });
  }

  /**

   * @description Get all registered Political Office
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @returns {object} JSON object representing data object
   * @memberof getAllOffice
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
   * @memberof getOfficeById
   */

  static getOfficeById(req, res) {
    const { id: postId } = req.params;
    const query = 'SELECT * FROM office WHERE id = $1';
    databaseConnection.query(query, [postId], (err, dbRes) => {
      if (dbRes.rowCount > 0) {
        return res.status(200).json({
          status: 200,
          data: dbRes.rows[0],
        });
      }
      if (err) {
        return res.status(404).json({
          status: 404,
          error: 'Office with such id does not exist',
        });
      }
      return res.status(404).json({
        status: 404,
        error: 'Party not found!',
      });
    });
  }
}
export default OfficeController;
