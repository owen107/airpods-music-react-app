const express = require('express');
const app = express();
const path = require('path');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackHotServerMiddleware = require('webpack-hot-server-middleware');
const config = require('../../build/webpack.development.config.js');
const compiler = webpack(config);

app.use(webpackDevMiddleware(compiler, {
  // The publicPath needs to be the one
  // insde the webpack config file
  publicPath: '/dist/',
  serverSideRender: true
}));

app.use(webpackHotMiddleware(compiler.compilers.find(compiler => compiler.name === 'client')));
app.use(webpackHotServerMiddleware(compiler));

const PORT = process.env.PORT || 8080;
app.listen(8080, () => {
  console.log(`Listening on PORT: ${PORT}`);
});