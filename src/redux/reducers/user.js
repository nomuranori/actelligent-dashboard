import {
  POST_LOGIN,
  POST_LOGOUT,
  POST_REGISTER
} from 'redux/types'

const defaultState = {
  currentUser: {
    isLoggedIn: false
  }
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case POST_REGISTER:
      return {
        ...state,
        currentUser: {
          isLoggedIn: true
        }
      }
    case POST_LOGIN:
      return {
        ...state,
        currentUser: {
          isLoggedIn: true
        }
      }

    case POST_LOGOUT:
      return {
        ...state,
        currentUser: {
          isLoggedIn: false
        }
      }

    default:
      return state;

  }

};