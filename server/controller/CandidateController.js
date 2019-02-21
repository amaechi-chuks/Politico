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
    const { id } = req.params;
    const query1check = await HelperUtils.candidateStatus(id);
    try {
      if (query1check.rows[0].status === true) {
        return res.status(400).json({
          status: 400,
          error: 'Candidate status already approved',
        });
      }
      const query2 = `
  UPDATE interest SET status = true where id = $1  RETURNING *`;
      const { rows } = await databaseConnection.query(query2, [id]);
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
