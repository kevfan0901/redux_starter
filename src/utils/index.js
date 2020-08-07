import { message } from 'antd';
import store from './Store';
import { setLoaderVisible } from '../actions/user';

const toggleLoader = (isOpen = false) => {
  if (isOpen) {
    store.dispatch(setLoaderVisible.openLoader());
  } else {
    store.dispatch(setLoaderVisible.closeLoader());
  }
};

message.config({
  top: 100,
  duration: 2,
  maxCount: 3,
});

export { message, toggleLoader };
