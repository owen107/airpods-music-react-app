const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.config.js');
const webpackNodeExternals = require('webpack-node-externals');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const autoprefixer = require('autoprefixer');

const clientConfig = {
  name: 'client',

  // Inform webpack that we are
  // building a bundle for browser
  target: 'web',

  // Tell webapck the root file of
  // our server application, and set
  // multiple entry points with array
  entry: {
    main: [
      './src/client/client.js',
      'webpack-hot-middleware/client?timeout=20000&reload=true'
    ]
  },

  // Tell webpack where to put the output file
  // that is generated
  output: {
    filename: 'client.js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/dist/',
  },

  module: {
    rules: [
      {
        test: /\.css/,
        use: [
          // creates style nodes from JS strings
          'style-loader',
          {
            // translates CSS into CommonJS
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: '[name]__[local]___[hash:base64:6]',
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              indent: 'postcss',
              plugins: () => [
                autoprefixer({browsers: ['> 1%']})
                // require('autoprefixer')({browsers: ['> 1%']})
              ]
            }
          }
        ]
      },
      {
        test: /\.scss/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: '[name]__[local]___[hash:base64:6]',
              sourceMap: true
            }
          },
          {
            // compiles Sass to CSS
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              indent: 'postcss',
              plugins: () => [
                autoprefixer({browsers: ['> 1%']})
                // require('autoprefixer')({browsers: ['> 1%']})
              ]
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf)(\?.*$|$)/,
        loader: 'url-loader',
        options: {
          limit: 1,
          name: '[name]-[hash].[ext]'
        }
      },
      {
        test: /\.svg(\?.*$|$)/,
        loader: 'url-loader',
        options: {
          limit: 1,
          mimetype: 'image/svg+xml',
          name: '[name]-[hash].[ext]'
        }
      },
      {
        test: /\.(jpg|png|gif|webp)$/,
        loader: 'url-loader',
        options: {
          limit: 8000,
          name: '[name]-[hash].[ext]'
        }
      },
      {
        test: /\.(ogg|mp3|wav|mpe?g)$/i,
        loader: 'file-loader'
      }
    ]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new ProgressBarPlugin()
  ]
};

const serverConfig = {
  name: 'server',

  // Inform webpack that we are building
  // a bundle for NodeJS, rather than browser
  target: 'node',

  // Tell webapck the root file of
  // our server application
  entry: './src/server/index.js',

  // Tell webpack where to put the output file
  // that is generated
  output: {
    filename: 'server.js',
    libraryTarget: 'commonjs2',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/dist/',
  },

  module: {
    rules: [
      {
        test: /\.css/,
        use: [
          // creates style nodes from JS strings
          // particularly for server usage
          'isomorphic-style-loader',
          {
            // translates CSS into CommonJS
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: '[name]__[local]___[hash:base64:6]',
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.scss/,
        use: [
          'isomorphic-style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: '[name]__[local]___[hash:base64:6]',
              sourceMap: true
            }
          },
          {
            // compiles Sass to CSS
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.svg(\?.*$|$)/,
        loader: 'url-loader',
        options: {
          limit: 1,
          mimetype: 'image/svg+xml',
          name: '[name]-[hash].[ext]'
        }
      },
      {
        test: /\.(jpg|png|gif|webp)$/,
        loader: 'url-loader',
        options: {
          limit: 8000,
          name: '[name]-[hash].[ext]'
        }
      },
      {
        test: /\.(ogg|mp3|wav|mpe?g)$/i,
        loader: 'file-loader'
      }
    ]
  },

  externals: [webpackNodeExternals()]
};

module.exports = [
  merge(baseConfig, clientConfig),
  merge(baseConfig, serverConfig)
];