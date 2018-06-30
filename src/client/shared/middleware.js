import request from './requests';

// Create promise middleware for handling http requests
const promiseMiddleware = store => next => action => {
  if (isPromise(action.payload)) {
    // Set action subtype when async requests start
    store.dispatch({type: 'ASYNC_START', subtype: action.type});

    // Resolve http request promises
    action.payload
      .then((res) => {
        action.payload = res.data;
        store.dispatch(action);
      })
      .catch((error) => {
        action.error = true;
        action.payload = error.response.data;
        store.dispatch(action);
      });

    return;
  }

  next(action);
};

function isPromise(v) {
  return v && typeof v.then === 'function';
}

// Create local storage middleware for setting auth token
const localStorageMiddleware = store => next => action => {
  if (action.type === 'LOGIN' || action.type === 'SIGNUP') {
    if (!action.error) {
      window.localStorage.setItem('jwt', action.payload.user.token);
      window.localStorage.setItem('username', action.payload.user.username);
      request.setToken(action.payload.user.token);
    }
  } else if (action.type === 'LOGOUT') {
    window.localStorage.removeItem('jwt');
    window.localStorage.removeItem('username');
    request.setToken(null);
  }

  next(action);
}

export {
  localStorageMiddleware,
  promiseMiddleware
};