import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { Provider } from 'react-redux';
import Routes from './routes';
import Helmet from 'react-helmet';
import Root from './Root/root';
import createStore from './store/createStore';
import { isClient } from './shared/utils';
import Meta from './components/meta/index';

// Create client store for redux provider
// and pass preset initial state into it
const store = createStore(window.INITIAL_STATE);

// Render function is not supported in React v17, so using hydrate for server side rendering
ReactDOM.hydrate(
  <Provider store={store}>
    <BrowserRouter>
      <Root>
        <Meta />
        {renderRoutes(Routes)}
      </Root>
    </BrowserRouter>
  </Provider>,
  document.querySelector('#root'));
