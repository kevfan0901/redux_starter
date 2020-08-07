const util = require('util');
const path = require('path');
const fs = require('fs');
const readline = require('readline');
const { google } = require('googleapis');
const zipObjectDeep = require('lodash/zipObjectDeep');

const dotenv = require('dotenv');

// override process.env
const envConfig = dotenv.parse(fs.readFileSync(path.resolve('.env')));

for (const key in envConfig) {
  if (Object.prototype.hasOwnProperty.call(envConfig, key)) {
    process.env[key] = envConfig[key];
  }
}

const csvToJson = (csv, delimiter = ',') => {
  const lines = csv.split('\n');
  const json = [];

  // 取得表頭欄位
  const headers = lines[0].split(delimiter).map((header) => header.toLowerCase().trim());
  console.log('lines', lines);
  console.log('headers', headers);
  for (let i = 1; i < lines.length; i += 1) {
    const obj = {};
    if (lines[i] !== '') {
      const currentline = lines[i].split(delimiter);
      if (currentline[0] !== '') {
        for (let j = 0; j < headers.length; j += 1) {
          obj[headers[j]] = currentline[j] ? currentline[j].trim() : '';
        }
        json.push(obj);
      }
    }
  }
  return json;
};

function readFile(path) {
  let fileContent;
  return new Promise((resolve) => {
    fileContent = fs.readFileSync(path, { encoding: 'utf8' });
    resolve(fileContent);
  });
}


// 輸出到前端吃翻譯檔的資料夾
function generateI18nFiles(data) {
  // 產生n個語系檔
  data.forEach((datum) => {
    if (datum.type === 'json') {
      fs.writeFileSync(path.resolve(__dirname, '../', datum.fileName), JSON.stringify(datum.content, null, 2));
    }

    if (datum.type === 'js') {
      const content = JSON.stringify(datum.content, null, 2)
        .replace(/"(\w.*)":/g, (searchStr, replaceStr) => `${replaceStr}:`)
        .replace(/"(\w.*)"/g, (searchStr, replaceStr) => `'${replaceStr}'`)
        .replace(/'(\w.*)'(?!,)/g, (searchStr, replaceStr) => `'${replaceStr}',`)
        .replace(/(})(?!,)/g, (searchStr, replaceStr) => `${replaceStr},`)
        .replace(/(,)$/g, () => ';');

      fs.writeFileSync(path.resolve(__dirname, '../', datum.fileName), `export default ${content}\n`);
    }
  });
}

const SPREADSHEETID = process.env.GOOGLE_SPREADSHEET_ID;

async function listMajors() {
  try {
    const spreadsheetId = SPREADSHEETID;
    const sheets = google.sheets({ version: 'v4', auth: process.env.GOOGLE_API_KEY });
    const sheetsData = await util.promisify(sheets.spreadsheets.get)({ spreadsheetId });
    // Fetch all tabs
    const sheetsTabs = sheetsData.data.sheets.map((sheet) => sheet.properties.title);
    const asyncSheetsSpreadsheetsValuesGet = util.promisify(sheets.spreadsheets.values.get);
    const response2 = await Promise.all(sheetsTabs.map((tab) => asyncSheetsSpreadsheetsValuesGet({ spreadsheetId, range: `${tab}!A1:Z` })));
    const header = response2[0].data.values[0].join('@_#');
    const content = response2.map((data) => {
      const tab = data.data.range.replace(/!A\d+:Z\d+/, '');
      return data.data.values.filter((d, i) => i !== 0 && d[0] !== '').map((v) => `${tab}.${v.join('@_#')}`);
    });
    return [header, ...content.reduce((a, d) => [...a, ...d], [])].join('\n');
  } catch (err) {
    console.log('[ERROR]i18nHelper執行失敗', err);
  }
}

(async () => {
  const filePromise = await listMajors();
  const csv = csvToJson(filePromise, '@_#');
  const keyArray = csv.map((f) => f.key);
  const enUS = csv.map((f) => f['en-us']);
  const zhTW = csv.map((f) => f['zh-tw']);

  generateI18nFiles([
    { fileName: 'en-US.json', content: zipObjectDeep(keyArray, enUS), type: 'json' },
    { fileName: 'zh-TW.json', content: zipObjectDeep(keyArray, zhTW), type: 'json' },
    { fileName: 'i18nKeys.js', content: zipObjectDeep(keyArray, keyArray), type: 'js' },
  ]);
})();
