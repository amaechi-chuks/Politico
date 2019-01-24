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

  /**
   * @description Get all registered  Office
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @returns {object} JSON object representing data object
   * @memberof getAllOffices
   */
  static getAllOffice(req, res) {
    return res.status(200).json({
      status: 200,
      data: officeDb,
    });
  }

  // //Get by id

  /**
   * @description Get a registered  office by id
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @returns {object} {object} JSON object representing data object
   * @memberof getOfficeById
   */
  static getOfficeById(req, res) {
    const data = officeDb.filter(
      OfficeObj => Number(req.params.id) === OfficeObj.id,
    );
    if (data) {
      return res.status(200).json({
        status: 200,
        data,
      });
    }
    return res.status(404).json({
      status: 404,
      error: 'id does not exist',
    });
  }

  /**
   * @description Delete a registered  office by id
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @returns {object} {object} JSON object representing data object
   * @memberof deleteOfficeById
   */
  static deleteOfficeById(req, res) {
    const id = Number(req.params.id);
    // Use find to get object to delete
    const OfficeToDelete = officeDb.find(Office => Office.id === id);
    // Get the index of the object to delete
    const objId = officeDb.indexOf(OfficeToDelete);
    // Using the object index, splice the object out of the officeDb
    officeDb.splice(objId, 1);
    res.status(200).json({
      status: 200,
      data: [{
        id,
        message: 'Office record has been deleted',
      }],
    });
  }
}
