import databaseConnection from '../model/databaseConnection';

/**
 * @class InterestController
 * @description Specifies which method handles a given request for a specific endpoint
 *
 */

class InterestController {
  /**
         * @description Indicate interest to run for an office
         * @param {object} req - The request object
         * @param {object} res - The response object
         * @return {object} JSON representing data object
         * @memberof indicateInterest
         */
  static async indicateInterest(req, res) {
    const { office, party } = req.body;
    const { id } = req.params;
    // const query1check = await HelperUtils.duplicateCandidateCheck(candidate);
    try {
      const query = `
  INSERT INTO interest(id, office, party) VALUES($1, $2, $3) RETURNING *`;
      const params = [id, office, party];
      const { rows } = await databaseConnection.query(query, params);
      return res.status(201).json({
        status: 201,
        data: [rows[0]],
      });
    } catch (error) {
      return res.status(401).json({
        status: 401,
        error: 'You are already running for an office',
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
   * @memberof fetchAllInterestedUsers
   */
  static async fetchAllInterestedUsers(req, res) {
    const query = 'SELECT * FROM interest';
    databaseConnection.query(query, (err, dbRes) => res.status(200).json({
      status: 200,
      data: dbRes.rows,
    }));
  }

  /**
   *
   *
   * @static
   * @param {Object} req  The request object
   * @param {Object} res The response object
   * @returns {Object} JSON object representing the data
   * @memberof fetchInterestedUserById
   */
  // eslint-disable-next-line consistent-return
  static async fetchInterestedUserById(req, res) {
    const { id } = req.params;
    const query = 'SELECT * FROM interest WHERE id = $1';
    try {
      // eslint-disable-next-line consistent-return
      await databaseConnection.query(query, [id], (err, dbRes) => {
        if (dbRes.rowCount > 0) {
          return res.status(200).json({
            status: 200,
            data: dbRes.rows[0],
          });
        }
        return res.status(404).json({
          status: 404,
          error: 'User not interested to run for any office',
        });
      });
    } catch (error) {
      throw error;
    }
  }
}

export default InterestController;
