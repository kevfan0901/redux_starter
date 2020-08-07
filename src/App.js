import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import { ConfigProvider } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';
import store from './utils/Store';
import i18n from './locales/i18n';
import Routes from './routes/routes';
import Loading from './components/Loading';
import 'antd/dist/antd.css';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <ConfigProvider locale={enUS}>
          <HashRouter>
            <Routes />
          </HashRouter>
          <Loading />
        </ConfigProvider>
      </I18nextProvider>
    </Provider>
  );
}

export default React.memo(App);
