const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

const config = require('./base.config');

config.devtool = 'cheap-module-source-map';

config.output.filename = 'js/[name].min.js';
config.output.path = '/';

for (let name of Object.keys(config.entry)) {
  config.entry[name].unshift('webpack-hot-middleware/client', 'react-hot-loader/patch');
}

config.plugins.push(
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoEmitOnErrorsPlugin(), // don't serve bundle if there are errors
  new webpack.ProgressPlugin(),
  new ExtractTextPlugin({ disable: true }),
  new HardSourceWebpackPlugin(), // improve caching capabilities
);

module.exports = config;
