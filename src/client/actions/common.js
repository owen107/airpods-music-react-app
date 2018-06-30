
export const APP_LOAD = 'APP_LOAD';
export const REDIRECT = 'REDIRECT';
export const LOGOUT = 'LOGOUT';

export function onRedirect() {
  return {
    type: REDIRECT
  };
}

export function onLoad (payload, token) {
  return {
    type: APP_LOAD,
    payload,
    token
  }
}

export function onLogout() {
  return {
    type: LOGOUT
  };
}
