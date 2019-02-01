import databaseConnection from '../model/databaseConnection';

/**
 * @class CandidateController
 * @description Specifies which method handles a given request for a specific endpoint
 *
 */

class CandidateController {
  /**
         * @description Create a new political candidate
         * @param {object} req - The request object
         * @param {object} res - The response object
         * @return {object} JSON representing data object
         * @memberof createCandidate
         */
  static createCandidate(req, res) {
    const {
      office, party, candidate,
    } = req.body;
    const query = `
      INSERT INTO candidate(office, party, candidate) VALUES($1, $2, $3) RETURNING *`;
    const params = [office, party, candidate];
    databaseConnection.query(query, params, (err, dbRes) => {
      if (dbRes) {
        return res.status(201).json({
          status: 201,
          data: dbRes.rows[0],
        });
      }
      return res.status(500).json({
        status: 500,
        error: 'Something went wrong with the database.',
      });
    });
  }
}


export default CandidateController;
