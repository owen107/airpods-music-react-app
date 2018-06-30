const defaultState = {
  token: null
};

export default (state=defaultState, action) => {
  switch(action.type) {
    case 'APP_LOAD':
      return {
        ...state,
        token: action.token || null,
        appLoaded: true,
        currentUser: action.payload ? action.payload : null
      };
    case 'REDIRECT':
      return {
        ...state,
        redirectTo: null
      };
    case 'LOGIN':
    case 'SIGNUP':
      return {
        ...state,
        redirectTo: action.error ? null : '/',
        token: action.error ? null : action.payload.user.token,
        currentUser: action.error ? null : action.payload.user.username
      };
    case 'LOGOUT':
      return {
        ...state,
        redirectTo: '/login',
        token: null,
        currentUser: null
      };
  }
  return state;
}