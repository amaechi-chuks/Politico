import parties from '../models/partyModels';

/**
 * Class representing partiesController
 * @class partiesController
 */
class PartiesController {
  /**
       * Create new product record
       * @static
       * @param {object} req - The request object
       * @param {object} res - The response object
       * @return {object} JSON representing data object
       * @memberof PartiesController
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
   * Get all parties from mockDb
   * @static
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @returns {object} JSON object representing data object
   * @memberof PartiesController
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
