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
  // new BabiliPlugin(), // this crashes on server. disabled until we can figure out why.
  new CleanPlugin([config.output.path], {
    root: path.resolve(__dirname, '../../'),
  }),
  new webpack.optimize.ModuleConcatenationPlugin(),
);

module.exports = config;
