import axios from 'axios';
import { message } from './index';
import store from './Store';
import APPCONFIG from './config';
import { userTypes } from '../actions/types';

const userData = JSON.parse(sessionStorage.getItem('userData'));
const instance = axios.create({
  baseURL: APPCONFIG.BackEndWebApi,
  timeout: APPCONFIG.intervalsTime,
  headers: userData ? { Authorization: userData.token } : {},
});

const spinnerHide = []; // 不要有loading的api
let responseQueue = []; // 存是否還有任務未回應
const toggleLoader = (visible) => store.dispatch({ type: userTypes.SET_LOADER_VISIBLE, visible });

instance.interceptors.request.use((config) => {
  if (!spinnerHide.includes(config.url)) {
    responseQueue.push(config.url);
    toggleLoader(true);
  }
  return config;
});

instance.interceptors.response.use((response) => {
  responseQueue = responseQueue.filter((data) => data !== response.config.url);
  if (responseQueue.length === 0) toggleLoader(false);
  return response;
}, (error) => {
  message.error(error.message);
  if (error && error.response) {
    if (error.response.status === 401) {
      sessionStorage.removeItem('userData');
      window.location.replace('');
    }
  }
  responseQueue = [];
  toggleLoader(false);
  return Promise.reject(error);
});

export default instance;
