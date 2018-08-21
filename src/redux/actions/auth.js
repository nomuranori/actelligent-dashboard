import {
  POST_LOGIN,
  POST_LOGOUT,
} from '@redux/types'
export const loginUser = (username, password) => {
  return (dispatch) => {
    type: POST_LOGIN
  }
};
export const logoutUser = () => {
  return (dispatch) => {
    type: POST_LOGOUT
  }
};