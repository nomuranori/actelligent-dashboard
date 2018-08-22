import {
  POST_LOGIN,
  POST_LOGOUT,
  POST_REGISTER
} from '../types'

export const registerUser = (username, password) => {
  return (dispatch) => {
    dispatch({type: POST_REGISTER})
  }
};
export const loginUser = (username, password) => {
  return (dispatch) => {
    dispatch({type: POST_LOGIN})
  }
};
export const logoutUser = () => {
  return (dispatch) => {
    dispatch({type: POST_LOGOUT})
  }
};