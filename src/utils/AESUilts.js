import { createCipheriv, createDecipheriv, createHash } from 'crypto';

const key = 'wiordering.abc..';
const iv = 'wiorderi@wistron';


export function paramsEncode(str) {
  const cipher = createCipheriv('aes-128-cbc', key, iv);
  let crypted = cipher.update(str, 'utf8', 'hex');
  crypted += cipher.final('hex');
  return crypted;
}

export function paramsDecode(cryptedHex) {
  const decipher = createDecipheriv('aes-128-cbc', key, iv);
  let decoded = decipher.update(cryptedHex, 'hex', 'utf8');
  decoded += decipher.final('utf8');
  return decoded;
}

// Hash md5
export function paramsHash(password) {
  const hash = createHash('md5');
  hash.update(`${password}`);
  return hash.digest('hex');
}


export function cryptoDecode(thisKey, thisIv, data) {
  const newCrypted = Buffer.from(data, 'base64').toString('binary');
  const decipher = createDecipheriv('aes-128-cbc', thisKey, thisIv);
  let decoded = decipher.update(newCrypted, 'binary', 'utf8');
  decoded += decipher.final('utf8');
  return decoded;
}

export function cryptoEncode(thisKey, thisIv, data) {
  const cipher = createCipheriv('aes-128-cbc', thisKey, thisIv);
  let crypted = cipher.update(data, 'utf8', 'binary');
  crypted += cipher.final('binary');
  crypted = Buffer.from(crypted, 'binary').toString('base64');
  return crypted;
}

export function encrypt(data) {
  return cryptoEncode(key, iv, data);
}
