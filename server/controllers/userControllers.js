import userDb from '../models/userModels';

/**
 * Class representing UserController
 * @class UserController
 */
export default class UserController {
  /**
       * Signup a user to the application
       * @static
       * @param {object} req - The request object
       * @param {object} res - The response object
       * @return {object} JSON representing data message
       * @memberof UserController
       */
  static signUp(req, res) {
    const id = userDb[userDb.length - 1].id + 1;
    const registered = new Date();
    const isAdmin = false;
    const {
      firstName, lastName, otherName, email, phoneNumber, passportUrl,
    } = req.body;
    const newUser = {
      id,
      firstName,
      lastName,
      otherName,
      email,
      phoneNumber,
      passportUrl,
      registered,
      isAdmin,
    };
    userDb.push(newUser);
    res.status(201);
    res.json({
      status: 201,
      data: [newUser],
    });
  }
}
