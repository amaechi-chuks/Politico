import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcryptjs from 'bcryptjs';

dotenv.config();
process.env.SECRET_KEY = 'andela21';
class HelperUtils {
  static validate() {
    return {
      name: /^[a-zA-Z_ ]+$/,
      userName: /[a-zA-Z]/,
      email: /^([A-z0-9]+)([._-]{0,1})([A-z0-9]+)@([A-z0-9-_.]+)\.([A-z]{2,3})$/,
      phonenumber: /^[+\d\-\s]+$/,
      location: /^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/,
      hqAddress: /^[a-zA-Z0-9\s,'-]*$/,
      logoUrl: /\.(gif|jpg|jpeg|tiff|png|mp4)$/i,
      type: /(federal|legislative|state|local government)$/i,
    };
  }

  static generateToken(payload) {
    const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1 week' });
    return token;
  }

  static verifyToken(token) {
    try {
      const payload = jwt.verify(token, process.env.SECRET_KEY);
      return payload;
    } catch (error) {
      return false;
    }
  }

  static hashPassword(password) {
    return bcryptjs.hashSync(password, 10);
  }

  static verifyPassword(password, hash) {
    return bcryptjs.compareSync(password, hash);
  }
}
export default HelperUtils;
