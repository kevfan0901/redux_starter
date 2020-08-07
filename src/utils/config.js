const APPCONFIG = process.env.NODE_ENV === 'production' ? {
  brand: '正式',
  BackEndWebApi: '/',
  intervalsTime: 10000,
} : {
  brand: '測試',
  BackEndWebApi: 'http://10.35.41.17:3050',
  intervalsTime: 120000,
};

export default APPCONFIG;
