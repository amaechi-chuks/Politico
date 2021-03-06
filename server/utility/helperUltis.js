import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
import databaseConnection from '../model/databaseConnection';

class HelperUtils {
  static validate() {
    return {
      name: /^[a-zA-Z\s]/,
      userName: /^[a-zA-Z]+$/,
      email: /^([A-z0-9]+)([._-]{0,1})([A-z0-9]+)@([A-z0-9-_.]+)\.([A-z]{2,3})$/,
      phoneNumber: /^[+\d\-\s]+$/,
      location: /^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/,
      hqAddress: /^[a-zA-Z0-9\s]+$/,
      logoUrl: /\.(gif|jpg|jpeg|tiff|png|mp4)$/i,
      type: /(federal|legislative|state|local government)$/i,
    };
  }

  static generateToken(payload) {
    const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: 60 * 60 * 1440 });
    return token;
  }

  static verifyToken(token) {
    const payload = jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => decoded);
    return payload;
  }


  static hashPassword(password) {
    return bcryptjs.hashSync(password, 10);
  }

  static verifyPassword(password, hash) {
    return bcryptjs.compareSync(password, hash);
  }

  static duplicateCandidateCheck(candidate) {
    return databaseConnection.query('SELECT * FROM candidate WHERE candidate = $1', [candidate]);
  }

  static candidateStatus(id) {
    return databaseConnection.query('SELECT * FROM interest WHERE id = $1', [id]);
  }

  static duplicateVoteCheck(candidate, voter) {
    return databaseConnection.query('SELECT * FROM vote WHERE candidate = $1 AND voter = $2', [candidate, voter]);
  }

  static doesCandidateExist(candidate, office) {
    return databaseConnection.query('SELECT * FROM candidate WHERE candidate = $1 AND office = $2', [candidate, office]);
  }

  static doesPartyExist(party) {
    return databaseConnection.query('SELECT * FROM party WHERE name = $1', [party]);
  }

  static updateProfilePic(passporturl, id) {
    return databaseConnection.query('UPDATE users SET passporturl = $1 WHERE id = $2 RETURNING *',
      [passporturl, id]);
  }
}


export default HelperUtils;
