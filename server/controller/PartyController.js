import databaseConnection from '../model/databaseConnection';
/**
 * Class representing PartyController
 * @class PartyController
 */
class PartyController {
  /**
       * @description Create a new political party
       * @param {object} req - The request object
       * @param {object} res - The response object
       * @return {object} JSON representing data object
       * @memberof createParty
       */
  // eslint-disable-next-line consistent-return
  static async createParty(req, res) {
    let {
      name, hqAddress, logoUrl,
    } = req.body;
    name = name.trim().toLowerCase();
    hqAddress = hqAddress.trim().toLowerCase();
    logoUrl = logoUrl.trim().toLowerCase();
    const query = `
    INSERT INTO party(name, hqAddress, logoUrl) VALUES($1, $2, $3) RETURNING *`;
    const params = [name, hqAddress, logoUrl];
    try {
      await databaseConnection.query(query, params, (err, dbRes) => {
        return res.status(201).json({
          status: 201,
          data: dbRes.rows,
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
   * @description Get all registered Political party
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @returns {object} JSON object representing data object
   * @memberof getAllParty
   */

  static getAllParty(req, res) {
    const query = 'SELECT * FROM party';
    databaseConnection.query(query, (err, dbRes) => res.status(200).json({
      status: 200,
      data: dbRes.rows,
    }));
  }

  /**
   * @description Get a registered Political party by id
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @returns {object} {object} JSON object representing data object
   * @memberof getPartyById
   */
  // eslint-disable-next-line consistent-return
  static async getPartyById(req, res) {
    const { id: postId } = req.params;
    const query = 'SELECT * FROM party WHERE id = $1';
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
    } catch (err) {
      return res.status(404).json({
        status: 404,
        error: 'Party with such id does not exist',
      });
    }
  }
  /**
   * @description PATCH a registered Political party by name
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @returns {object} {object} JSON object representing data object
   * @memberof updateName
   */

  // eslint-disable-next-line consistent-return
  static async updateName(req, res) {
    const { id: postId } = req.params;
    const { name } = req.body;
    const query = `
        UPDATE party SET name = $1 WHERE id = $2 RETURNING *`;
    try {
      await databaseConnection.query(query, [name, postId], (err, dbRes) => {
        if (dbRes.rowCount > 0) {
          const updatedName = dbRes.rows[0];
          res.status(201).json({
            status: 201,
            data: updatedName,
          });
        }
      });
    } catch (err) {
      return res.status(404).json({
        status: 404,
        error: 'Party with an id not found',
      });
    }
  }

  /**
   * @description Delete a registered Political party by id
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @returns {object} {object} JSON object representing data object
   * @memberof deletePartyById
   */

  // eslint-disable-next-line consistent-return
  static async deletePartyById(req, res) {
    const { id: postId } = req.params;
    const query = 'DELETE FROM party WHERE id = $1';
    try {
      // eslint-disable-next-line consistent-return
      await databaseConnection.query(query, [postId], (err, dbRes) => {
        if (dbRes.rowCount > 0) {
          return res.status(200).json({
            status: 200,
            data: [{
              message: 'Successfully deleted',
            }],
          });
        }
      });
    } catch (err) {
      return res.status(400).json({
        status: 400,
        error: 'No party record found',
      });
    }
  }
}
export default PartyController;
