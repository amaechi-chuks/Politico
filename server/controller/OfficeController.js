import officeDb from '../model/OfficeModel';

/**
 * Class representing OfficeController
 * @class OfficeController
 */
export default class OfficeController {
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
    const id = officeDb[officeDb.length - 1].id + 1;
    const registerdAt = new Date();
    const updatedAlt = new Date();
    const newOffice = {
      id, type, name, registerdAt, updatedAlt,
    };
    if (newOffice) {
      officeDb.push(newOffice);
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
}
