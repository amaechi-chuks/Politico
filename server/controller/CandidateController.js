import databaseConnection from '../model/databaseConnection';
import HelperUtils from '../utility/helperUltis';

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
  static async createCandidate(req, res) {
    const { office } = req.body;
    const { id: candidate } = req.params;
    const query1check = await HelperUtils.duplicateCandidateCheck(candidate);
    try {
      if (query1check.rowCount > 0) {
        return res.status(400).json({
          status: 400,
          error: 'Candidate already running for another office',
        });
      }
      const query2 = `
  INSERT INTO candidate(office, candidate) VALUES($1, $2) RETURNING *`;
      const params = [office, candidate];
      const { rows } = await databaseConnection.query(query2, params);
      return res.status(201).json({
        status: 201,
        data: [rows[0]],
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: 'Something went wrong with the database',
      });
    }
  }
}

export default CandidateController;
