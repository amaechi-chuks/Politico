import officesDb from '../models/officeModels';

/**
 * Class representing OfficeController
 * @class OfficeController
 */
export default class OfficesController {
  /**
         * @description Create a new political party
         * @param {object} req - The request object
         * @param {object} res - The response object
         * @return {object} JSON representing data object
         * @memberof createOffice
         */
  static createOffice(req, res) {
    const {
      type, name,
    } = req.body;
    const id = officesDb[officesDb.length - 1].id + 1;
    const registerdAt = new Date();
    const updatedAlt = new Date();
    const newOffice = {
      id, type, name, registerdAt, updatedAlt,
    };
    if (newOffice) {
      officesDb.push(newOffice);
      return res.status(201).json({
        status: 201,
        data: [
          newOffice,
        ],
      });
    }
    return res.status(400).json({
      status: 400,
      error: 'Bad request',
    });
  }

  /**
   * @description Get all registered Political Offices
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @returns {object} JSON object representing data object
   * @memberof getAllOffices
   */
  static getAllOffices(req, res) {
    return res.status(200).json({
      status: 200,
      data: officesDb,
    });
  }
}
