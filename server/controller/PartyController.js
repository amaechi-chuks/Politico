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
  static createParty(req, res) {
    const {
      name, hqAddress, logoUrl,
    } = req.body;
    const registerdAt = new Date();
    const query = `
    INSERT INTO party(name, hqAddress, logoUrl) VALUES($1, $2, $3) RETURNING *`;
    const params = [name, hqAddress, logoUrl];
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
          name,
          hqAddress,
          logoUrl,
          registerdAt,
        }],
      });
    });
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
  static getPartyById(req, res) {
    const { id: postId } = req.params;
    const query = 'SELECT * FROM party WHERE id = $1';
    databaseConnection.query(query, [postId], (err, dbRes) => {
      if (err) {
        return res.status(404).json({
          status: 404,
          error: 'Party with such id does not exist',
        });
      }
      if (dbRes.rowCount > 0) {
        return res.status(200).json({
          status: 200,
          data: dbRes.rows[0],
        });
      }
      return res.status(404).json({
        status: 404,
        error: 'Party not found!',
      });
    });
  }

  /**
   * @description PATCH a registered Political party by name
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @returns {object} {object} JSON object representing data object
   * @memberof updateName
   */

  static updateName(req, res) {
    const { id: postId } = req.params;
    try {
      if (req.body.name) {
        const { name } = req.body;
        const query = `
        UPDATE party SET name = $1 WHERE id = $2 RETURNING name`;

        return databaseConnection.query(query, [name, postId], (err, dbRes) => {
          if (dbRes.rowCount > 0) {
            const updatedName = dbRes.rows[0];
            res.status(201).json({
              status: 201,
              data: updatedName,
            });
          }
        });
      }
    } catch (err) {
      return res.status(500).json({
        status: 500,
        error: 'Something went wrong with the database',
      });
    }
    return res.status(404).json({
      status: 404,
      error: 'No party found',
    });
  }

  /**
   * @description Delete a registered Political party by id
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @returns {object} {object} JSON object representing data object
   * @memberof deletePartyById
   */

  static deletePartyById(req, res) {
    const { id: postId } = req.params;
    const query = 'DELETE FROM party WHERE id = $1';
    databaseConnection.query(query, [postId], (err, dbRes) => {
      if (dbRes.rowCount > 0) {
        return res.status(200).json({
          status: 200,
          data: [{
            id: postId,
            message: 'Party has been deleted',
          }],
        });
      }
      if (err) {
        return res.status(400).json({
          status: 400,
          error: 'No incident record found',
        });
      }
      return 'No incident with such record';
    });
  }
}
export default PartyController;
