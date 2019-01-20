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
    const newParties = {
      id,
      name,
      hdAddress,
      logoUrl,
      registerdAt,
      updatedAt,
    };
    if (newParties) {
      parties.push(newParties);
      return res.status(201).json({
        status: 201,
        data: [{
          message: 'parties successfully created',
          newParties,
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
