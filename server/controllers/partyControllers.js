import parties from '../models/partyModels';

/**
 * Class representing partiesController
 * @class partiesController
 */
class PartiesController {
  /**
       * @description Create a new political party
       * @param {object} req - The request object
       * @param {object} res - The response object
       * @return {object} JSON representing data object
       * @memberof createParties
       */
  static createParties(req, res) {
    const {
      name, hdAddress, logoUrl,
    } = req.body;
    const id = parties[parties.length - 1].id + 1;
    const registerdAt = new Date();
    const updatedAt = new Date();
    const newParty = {
      id,
      name,
      hdAddress,
      logoUrl,
      registerdAt,
      updatedAt,
    };
    if (newParty) {
      parties.push(newParty);
      return res.status(201).json({
        status: 201,
        message: 'Party successfully created',
        data: [{
          newParty,
        }],
      });
    }
    return res.status(400).json({
      status: 400,
      error: 'Bad request',
    });
  }

  /**
   * @description Get all registered Political parties
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @returns {object} JSON object representing data object
   * @memberof getAllParties
   */
  static getAllParties(req, res) {
    return res.status(200).json({
      status: 200,
      message: 'All parties successfully retrieved',
      data: [{
        parties,
      }],
    });
  }
}

export default PartiesController;
