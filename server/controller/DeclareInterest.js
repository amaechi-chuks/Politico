import databaseConnection from '../model/databaseConnection';
import HelperUtils from '../utility/helperUltis';

/**
 * @class CandidateController
 * @description Specifies which method handles a given request for a specific endpoint
 *
 */

class DeclareInterest {
  /**
         * @description Create a new political candidate
         * @param {object} req - The request object
         * @param {object} res - The response object
         * @return {object} JSON representing data object
         * @memberof createCandidate
         */
  static async declareInterest(req, res) {
    let { type, name, party } = req.body;
    type = type.trim().toLowerCase();
    name = name.trim().toLowerCase();
    party = party.trim().toLowerCase();
    const { id: candidate } = req.user;
    const query1check = await HelperUtils.doesPartyExist(party);
    try {
      if (query1check.rowCount > 0) {
        return res.status(400).json({
          status: 400,
          error: 'Party does not exist',
        });
      }
      const query2 = `
  INSERT INTO interest(type, name, party, candidate) VALUES($1, $2, $3, $4) RETURNING *`;
      const params = [type, name, party, candidate];
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
export default DeclareInterest;
