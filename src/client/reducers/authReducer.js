export default (state={}, action) => {
  switch(action.type) {
    case 'LOGIN':
    case 'SIGNUP':
      return {
        ...state,
        inProgress: false,
        errors: action.error ? action.payload.errors : null
      };
    case 'UPDATE_FIELD_AUTH':
      return { ...state, [action.key]: action.value};
    case 'LOGIN_PAGE_UNLOADED':
    case 'SIGNUP_PAGE_UNLOADED':
      return {};
    case 'ASYNC_START':
      if (action.subtype === 'LOGIN' || action.subtype === 'SIGNUP') {
        return { ...state, inProgress: true };
      }
      break;
  }
  return state;
}