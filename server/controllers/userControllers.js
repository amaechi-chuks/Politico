import userDb from '../models/userModels';


export default class UserController {
/**
     * Login a user to the application
     * @static
     * @param {object} req - The request object
     * @param {object} res - The response object
     * @return {object} JSON object representing success message
     * @memberof UserController
     */
  static login(req, res) {
    const { email, password } = req.body;
    // eslint-disable-next-line max-len
    const foundUser = userDb.find(checkUser => checkUser.email === email && checkUser.password === password);
    if (foundUser) {
      res.status(200);
      res.json({
        status: 200,
        data: `Welcome back, ${foundUser.firstName}!`,
      });
    } else {
      res.status(400).send({
        status: 400,
        error: 'Please check your email and password',
      });
    }
  }
}
