const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.config.js');
const webpackNodeExternals = require('webpack-node-externals');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const StatsPlugin = require('stats-webpack-plugin');
const autoprefixer = require('autoprefixer');

const clientConfig = {
  name: 'client',

  // Inform webpack that we are
  // building a bundle for browser
  target: 'web',

  // Tell webapck the root file of
  // our server application
  entry: './src/client/client.js',

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
          'postcss-loader'
        ]
      },
      {
        test: /\.scss/,
        use: [
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
    new webpack.optimize.OccurrenceOrderPlugin(),
    // Minify all the JavaScript files
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        screw_ie8: true,
        drop_console: true,
        drop_debugger: true
      },
      comments: false
    }),
    // Specify the global variable that can
    // be access across the application
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
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
        test: /\.s?css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'isomorphic-style-loader',
          use: [
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
              loader: 'sass-loader'
            }
          ]
        })
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
        test: /\.(woff|woff2|eot|ttf)(\?.*$|$)/,
        loader: 'url-loader',
        options: {
          limit: 1,
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

  externals: [webpackNodeExternals()],

  plugins: [
    // Extract all the css from webpack build
    // and generate a new style.csss file
    new ExtractTextPlugin({
      filename: 'style.css',
      allChunks: true
    }),
    // Search for CSS assets during the Webpack
    // build and will optimize/minimize the CSS
    new OptimizeCssAssetsPlugin({
      cssProcessorOptions: {
        discardComments: {
          removeAll: true
        }
      }
    }),
    // Specify the global variable that can
    // be access across the application
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    // Writes the stats of a build to a file.
    new StatsPlugin('stats.json', {
      chunkModules: true,
      modules: true,
      chunks: true,
      exclude: [/node_modules[\\\/]react/]
    })
  ]
};

module.exports = [
  merge(baseConfig, clientConfig),
  merge(baseConfig, serverConfig)
];