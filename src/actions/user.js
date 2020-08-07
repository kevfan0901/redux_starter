
import { userTypes } from './types';

export function setLoaderVisible(visible) {
  return { type: userTypes.SET_LOADER_VISIBLE, visible };
}
