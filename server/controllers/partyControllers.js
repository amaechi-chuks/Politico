import parties from '../models/partyModels';

/**
 * Class representing partiesController
 * @class partiesController
 */
class partiesController {
  /**
       * Create new product record
       * @static
       * @param {object} req - The request object
       * @param {object} res - The response object
       * @return {object} JSON representing success message
       * @memberof partiesController
       */
  static createparties(req, res) {
    const {
      name, hdAddress, logoUrl,
    } = req.body;
    const id = parties[parties.length - 1].id + 1;
    const registerdAt = new Date();
    const updatedAt = new Date();
    const newparties = {
      id,
      name,
      hdAddress,
      logoUrl,
      registerdAt,
      updatedAt,
    };
    if (newparties) {
      parties.push(newparties);
      return res.status(201).json({
        status: 201,
        data: [{
          message: 'parties successfully created',
          newparties,
        }],
      });
    }
    return res.status(400).json({
      status: 400,
      error: 'Bad request',
    });
  }
}

export default partiesController;
