import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enUS from './en-US.json';
import zhTW from './zh-TW.json';

i18n.use(initReactI18next).init({
  resources: {
    'en-US': {
      translations: enUS,
    },
    'zh-TW': {
      translations: zhTW,
    },
  },
  lng: localStorage.getItem('language') || 'en-US', // 預設語言
  fallbackLng: 'zh-TW', // 如果當前切換的語言沒有對應的翻譯則使用這個語言

  ns: ['translations'],
  defaultNS: 'translations',
  interpolation: {
    escapeValue: false,
    formatSeparator: ',',
  },
});

export default i18n;
