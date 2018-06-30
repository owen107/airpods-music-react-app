import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers/';
import { promiseMiddleware, localStorageMiddleware } from '../shared/middleware';

export default (preLoadedState) => {
  // Create server store for redux provider
  // With 3 argument:
  // 1. Reducers
  // 2. Initialize State
  // 3. Middlewares

  const store = createStore(
    reducers,
    preLoadedState,
    applyMiddleware(thunk, promiseMiddleware, localStorageMiddleware)
  );

  return store;
}