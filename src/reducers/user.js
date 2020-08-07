import { userTypes } from '../actions/types';

const initialState = {
  loading: false,
};

const User = (state = initialState, action) => {
  switch (action.type) {
    case userTypes.SET_LOADER_VISIBLE:
      return {
        ...state,
        loading: action.visible,
      };

    default:
      return state;
  }
};

export default User;
