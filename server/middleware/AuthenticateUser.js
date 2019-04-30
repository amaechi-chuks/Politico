import HelperUtils from '../utility/helperUltis';
/**
 * @class AuthenticateUser
 * @description Authenticates a given user
 * @exports AuthenticateUser
 */
class AuthenticateUser {
  /**
   * @method verifyAuthHeader
   * @description Verifies that the authorization was set
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object} - JSON response object
   */
  static verifyAuthHeader(req) {
    if (!req.headers.authorization) {
      return { error: 'error' };
    }
    const token = req.headers.authorization;
    const payload = HelperUtils.verifyToken(token);
    if (!payload) {
      return { error: 'token' };
    }
    return payload;
  }

  /**
   * @method verifyUser
   * @description Verifies the token provided by the user
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object} - JSON response object
   */
  static verifyUser(req, res, next) {
    const payload = AuthenticateUser.verifyAuthHeader(req);
    let error;
    let status;
    if (!payload || payload.error === 'error') {
      status = 401;
      error = 'You are not authorized';
    }
    if (payload.error === 'token') {
      status = 403;
      error = 'Forbidden';
    }
    if (error) {
      return res.status(status).json({
        errors: {
          body: [error],
        },
      });
    }
    req.user = payload;
    return next();
  }

  /**
   * @method verifyAdmin
   * @description Verifies the token provided by the Admin
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @returns {*} - JSON response object
   */
  static verifyAdmin(req, res, next) {
    const payload = AuthenticateUser.verifyAuthHeader(req);
    const { isAdmin } = payload.userObj;
    if (!isAdmin) {
      return res.status(403).json({
        errors: {
          body: ['You are not authorized to access this endpoint.'],
        },
      });
    }
    req.user = payload;
    return next();
  }
}
export default AuthenticateUser;
