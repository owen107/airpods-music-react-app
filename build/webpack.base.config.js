var path = require('path');

module.exports = {
  // Tell webpack to run babel on every file it runs through
  module: {
    rules: [
      {
        test: /\.js?$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },

  devtool: 'eval-source-map',

  resolve: {
    extensions: ['.js', '.json', '.scss', '.css']
  }
};