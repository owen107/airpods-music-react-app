import 'babel-polyfill';
import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { renderRoutes, matchRoutes } from 'react-router-config';
import Routes from '../client/routes';
import Template from './views/template';
import { Helmet } from 'react-helmet';
import { Provider } from 'react-redux';
import createStore from '../client/store/createStore';

export default function serverRenderer({ clientStats, serverStats }) {
  return(req, res, next) => {
    // Create server store for redux provider
    // and pass empty object state into it
    const store = createStore({});

    // Loop through all the routes object and collect all the new states
    // inside the store by accessing loadData function and get promisese
    const promises = matchRoutes(Routes, req.path).map(({ route }) => {
      return route.loadData ? route.loadData(store) : null;
    });

    // Resolve the promises for store to grap all new states
    Promise.all(promises).then(() => {
      const content = renderToString(
        <Provider store={store}>
          <StaticRouter location={req.path} context={{}}>
            <div>{renderRoutes(Routes)}</div>
          </StaticRouter>
        </Provider>
      );

      // To use on the server, call Helmet.renderStatic()
      // after ReactDOMServer.renderToString or it could
      // have memory leak
      const helmet = Helmet.renderStatic();

      // Send the corresponding html template back to client side
      res.status(200).send(Template({ content, helmet, store }));
    });
  }
}