import databaseConnection from '../model/databaseConnection';
import HelperUtils from '../utility/helperUltis';

/**
 * @class representing VoteController
 * @description Specifies which method handles a given request for a specific endpoint
 *
 */
class VoteController {
  /**
         * @description Create a new vote
         * @param {object} req - The request object
         * @param {object} res - The response object
         * @return {object} JSON representing data object
         * @memberof createVote
         */
  static async createVote(req, res) {
    const { office, candidate } = req.body;
    const { id: voter } = req.user;
    const preventDualVote = await HelperUtils.duplicateVoteCheck(candidate);
    if (preventDualVote.rowCount > 0) {
      return res.status(400).json({
        status: 400,
        error: 'You already voted for this candidate',
      });
    }
    const checkIfcandidateExist = await HelperUtils.doesCandidateExist(candidate, office);
    if (checkIfcandidateExist.rowCount < 1) {
      return res.status(400).json({
        status: 400,
        error: 'Candidate does not exist in this office',
      });
    }
    const query = `
    INSERT INTO vote(office, candidate, voter) VALUES($1, $2, $3) RETURNING *`;
    const params = [office, candidate, voter];
    try {
      const { rows } = await databaseConnection.query(query, params);
      return res.status(201).json({
        status: 201,
        data: [rows[0]],
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: 'You have already voted',
      });
    }
  }
}
export default VoteController;
