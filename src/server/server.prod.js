var express = require('express');
var path = require('path');
var app = express();
var compression = require('compression');

var ClientStatsPath = path.join(__dirname, '../../dist/stats.json');
var ClientAssetsPath = path.join(__dirname, '../../dist');
var ServerRendererPath = path.join(__dirname, '../../dist/server.js');
var ServerRenderer = require(ServerRendererPath).default;
var Stats = require(ClientStatsPath);

// compress responses
app.use(compression());

// Setup the public path so express knows where to look for the files
app.use('/dist', express.static(ClientAssetsPath));
app.use(ServerRenderer(Stats));

var PORT = process.env.PORT || 8080;
app.listen(PORT, function() {
  console.log("Listening on PORT: " + PORT);
});