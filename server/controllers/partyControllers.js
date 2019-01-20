import party from '../models/partyModels';

/**
 * Class representing PartyController
 * @class PartyController
 */
class PartyController {
  /**
       * Create new product record
       * @static
       * @param {object} req - The request object
       * @param {object} res - The response object
       * @return {object} JSON representing success message
       * @memberof PartyController
       */
  static createParty(req, res) {
    const {
      name, hdAddress, logoUrl,
    } = req.body;
    const id = party[party.length - 1].id + 1;
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
      party.push(newParty);
      return res.status(201).json({
        status: 201,
        data: [{
          message: 'Party successfully created',
          newParty,
        }],
      });
    }
    return res.status(400).json({
      status: 400,
      error: 'Bad request',
    });
  }
}

export default PartyController;
