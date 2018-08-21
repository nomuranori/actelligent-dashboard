import {
  POST_LOGIN,
  POST_LOGOUT,
} from 'redux/types'

const defaultState = {
  authenticated: false
};

export default (state = defaultState, action) => {

  switch (action.type) {

    case POST_LOGIN:
      return {
        authenticated: true
      }

    case POST_LOGOUT:
      return {
        authenticated: false
      }

    default:
      return state;

  }

};