const webpack = require('webpack');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

const config = require('./base.config');
const cssLoader = require('./css-loader');


config.mode = 'development';
config.devtool = 'cheap-module-source-map';
config.optimization = {
  noEmitOnErrors: true, // don't serve bundle if there are errors
};

config.output.filename = 'js/[name].min.js';
config.output.path = '/';

for (let name of Object.keys(config.entry)) {
  config.entry[name].unshift('webpack-hot-middleware/client');
}

cssLoader.unshift('style-loader');

config.module.rules.push(
  {
    test: /\.less$/,
    use: [...cssLoader, 'less-loader'],
  },
  {
    test: /\.css$/,
    use: cssLoader,
  },
);

config.plugins.push(
  new webpack.HotModuleReplacementPlugin(),
  new webpack.ProgressPlugin(),
  new HardSourceWebpackPlugin(), // improve caching capabilities
);

module.exports = config;
