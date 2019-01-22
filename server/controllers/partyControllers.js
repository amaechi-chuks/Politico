import partiesDb from '../models/partyModels';

/**
 * Class representing PartiesController
 * @class PartiesController
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
    const id = partiesDb[partiesDb.length - 1].id + 1;
    const registerdAt = new Date();
    const newParty = {
      id,
      name,
      hdAddress,
      logoUrl,
      registerdAt,
    };
    if (newParty) {
      partiesDb.push(newParty);
      return res.status(201).json({
        status: 201,
        data: [
          newParty,
        ],
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
      data: partiesDb,
    });
  }

  /**
   * @description Get a registered Political party by id
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @returns {object} {object} JSON object representing data object
   * @memberof getPartyById
   */
  static getPartyById(req, res) {
    const data = partiesDb.filter(
      partyObj => Number(req.params.id) === partyObj.id,
    );
    res.status(200).json({
      status: 200,
      data,
    });
  }

  /**
   * @description PATCH a registered Political party by name
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @returns {object} {object} JSON object representing data object
   * @memberof getPartyById
   */
  static updateName(req, res) {
    const partyRecord = partiesDb.filter(partyObj => partyObj.id === Number(req.params.id));
    const { name } = req.body;
    const id = Number(req.params.id);

    Object.assign({}, partyRecord[0], { name: `${name}` });

    res.status(200).json({
      status: 200,
      data: [{ id, name }],
    });
  }

  /**
   * @description Delete a registered Political party by id
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @returns {object} {object} JSON object representing data object
   * @memberof deletePartyById
   */
  static deletePartyById(req, res) {
    const id = Number(req.params.id);
    // Use filter so as not to mutate array
    partiesDb.filter(partyObj => partyObj.id !== Number(id));
    res.status(200).json({
      status: 200,
      data: [{
        id,
        message: 'Party record has been deleted',
      }],
    });
  }
}

export default PartiesController;
