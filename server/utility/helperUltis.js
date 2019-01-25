import dotenv from 'dotenv';

dotenv.config();

class HelperUtils {
  static validate() {
    return {
      name: /^[a-zA-Z_ ]+$/,
      email: /^([A-z0-9]+)([._-]{0,1})([A-z0-9]+)@([A-z0-9-_.]+)\.([A-z]{2,3})$/,
      phoneNumber: /^[+\d\-\s]+$/,
      location: /^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/,
      hqAddress: /^[a-zA-Z0-9\s,'-]*$/,
      logoUrl: /\.(gif|jpg|jpeg|tiff|png|mp4)$/i,
      type: /(federal|legislative|state|local government)$/i,
    };
  }
}

export default HelperUtils;
