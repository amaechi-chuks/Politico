import partyDb from '../model/partyModel';

/**
 * Class representing PartyController
 * @class PartyController
 */
export default class PartyController {
  /**
       * @description Create a new political party
       * @param {object} req - The request object
       * @param {object} res - The response object
       * @return {object} JSON representing data object
       * @memberof createParty
       */
  static createParty(req, res) {
    const {
      name, hqAddress, logoUrl,
    } = req.body;
    const id = partyDb[partyDb.length - 1].id + 1;
    const registerdAt = new Date();
    const newParty = {
      id,
      name,
      hqAddress,
      logoUrl,
      registerdAt,
    };
    if (newParty) {
      partyDb.push(newParty);
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
   * @description Get all registered Political party
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @returns {object} JSON object representing data object
   * @memberof getAllParty
   */

  static getAllParty(req, res) {
    return res.status(200).json({
      status: 200,
      data: partyDb,
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
    const data = partyDb.filter(
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
   * @memberof updateName
   */

  static updateName(req, res) {
    const id = Number(req.params.id);
    const { name } = req.body;
    const partyToUpdate = partyDb.find(partyObj => partyObj.id === id);
    if (req.body.name === undefined) {
      return res.status(404).json({
        status: 404,
        error: 'Party name must be specified',
      });
    }
    const partyIndex = partyDb.indexOf(partyToUpdate);
    partyToUpdate.name = name;
    partyDb[partyIndex] = partyToUpdate;
    return res.status(200).json({
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
    const partyToDelete = partyDb.find(party => party.id === id);
    // Get the index of the object to delete
    const objId = partyDb.indexOf(partyToDelete);
    // Using the object index, splice the object out of the partiesDb
    partyDb.splice(objId, 1);
    if (objId) {
      return res.status(200).json({
        status: 200,
        data: [{
          id,
          message: 'Party record has been deleted',
        }],
      });
    }
    return res.status(404).json({
      status: 404,
      error: 'Such id does not exist',
    });
  }
}
