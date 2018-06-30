import request from '../shared/requests';

export const LOGIN = 'LOGIN';
export const SIGNUP = 'SIGNUP';
export const UPDATE_FIELD_AUTH = 'UPDATE_FIELD_AUTH';
export const LOGIN_PAGE_UNLOADED = 'LOGIN_PAGE_UNLOADED';
export const SIGNUP_PAGE_UNLOADED = 'SIGNUP_PAGE_UNLOADED';

export function onChangeEmail(value) {
  return {
    type: UPDATE_FIELD_AUTH,
    key: 'email',
    value
  };
}

export function onChangePassword(value) {
  return {
    type: UPDATE_FIELD_AUTH,
    key: 'password',
    value
  };
}

export function onChangeUsername(value) {
  return{
    type: UPDATE_FIELD_AUTH,
    key: 'username',
    value
  };
}

export function onLoginSubmit(email, password) {
  return{
    type: LOGIN,
    payload: request.Auth.login(email, password)
  };
}

export function onSignupSubmit(username, email, password) {
  return {
    type: SIGNUP,
    payload: request.Auth.signup(username, email, password)
  };
}

export function onLoginUnload() {
  return {
    type: LOGIN_PAGE_UNLOADED
  };
}

export function onSignupUnload() {
  return {
    type: SIGNUP_PAGE_UNLOADED
  };
}