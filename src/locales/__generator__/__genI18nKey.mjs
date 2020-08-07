import fs from 'fs';
import uniq from 'lodash/uniq';
import enUS from './en-US';
import zhTW from './zh-TW';

const isObject = val => typeof val === 'object' && !Array.isArray(val);

function getObjectKeyString(obj = {}, i18nKey = []) {
  return Object.entries(obj).reduce((product, [key, value]) => {
    // console.log(i18nKey);
    if (isObject(value)) {
      return product.concat(getObjectKeyString(value, i18nKey.concat(key)));
    }
    return product.concat(i18nKey.concat(key).join('.'));
  }, []);
}

const keyArray = uniq([...getObjectKeyString(enUS), ...getObjectKeyString(zhTW)]).sort();
const csvHeader = ['Type', 'KEY', 'zh-TW', 'en-US'];

const content = keyArray.map((key) => {
  const keys = key.split('.');
  const type = keys[0];
  const col1 = getObjValue(zhTW, keys) || '';
  const col2 = getObjValue(enUS, keys) || '';
  return [type, key, col1, col2].join('|');
});

function getObjValue(obj, keys) {
  return keys.reduce((acc, key) => {
    return acc[key];
  }, obj);
}

function write(err) {
  if (err) console.log(err);
  else console.log('Write operation complete.');
}

fs.writeFile('index.csv', `${csvHeader.join('|')}\n${content.join('\n')}`, write);
