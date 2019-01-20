import dotenv from 'dotenv';

dotenv.config();

class HelperUtils {
  static validate() {
    return {
      name: /^[a-zA-Z]+$/,
      email: /^([A-z0-9]+)([._-]{0,1})([A-z0-9]+)@([A-z0-9-_.]+)\.([A-z]{2,3})$/,
      phonenumber: /^[+\d\-\s]+$/,
      location: /^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/,
      hqAddress: /^([0-9]|[A-z]|[.\-_])+$/,
      logoUrl: /\.(gif|jpg|jpeg|tiff|png|mp4)$/i,
    };
  }
}

export default HelperUtils;
