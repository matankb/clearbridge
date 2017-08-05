const webpack = require('webpack');
const path = require('path');

const config = require('./base.config');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BabiliPlugin = require('babili-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin');

config.output.filename = 'js/[name].[chunkhash].min.js';
config.output.path = path.join(__dirname, '../../build/');

config.plugins.push(
  new ExtractTextPlugin('css/[name].[contenthash].min.css'),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('production'),
  }),
  new CleanPlugin([config.output.path], {
    root: path.resolve(__dirname, '../../'),
  }),
  new webpack.optimize.ModuleConcatenationPlugin(),
  new BabiliPlugin({
    booleans: false,
    builtIns: false,
    consecutiveAdds: false,
    deadcode: false,
    evaluate: false,
    flipComparisons: false,
    guards: false,
    infinity: false,
    memberExpressions: false,
    mergeVars: false,
    numericLiterals: false,
    propertyLiterals: false,
    regexpConstructors: false,
    removeUndefined: false,
    replace: false,
    simplify: false,
    simplifyComparisons: false,
    typeConstructors: false,
    undefinedToVoid: false,
  }), // leave only mangle on to allow it to build on server
);

module.exports = config;
