const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = require('./base.config');

config.devtool = 'inline-eval-cheap-source-map';

config.output.filename = 'js/[name].min.js';
config.output.path = '/';
config.output.publicPath = '/';

for (let name of Object.keys(config.entry)) {
  config.entry[name].unshift('webpack-hot-middleware/client');
}

config.plugins.push(
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoEmitOnErrorsPlugin(), // don't serve bundle if there are errors
  new webpack.ProgressPlugin(),
  new ExtractTextPlugin({ disable: true }),
);

module.exports = config;
