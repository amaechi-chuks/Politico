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
       * @return {object} JSON representing success message
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
}

export default PartiesController;
