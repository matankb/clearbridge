const path = require('path');

const config = require('./base.config');
const cssLoader = require('./css-loader');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BabiliPlugin = require('babili-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin');


config.mode = 'production';
config.optimization = {
  minimize: false, // disable UglifyJS as we use babili
};

config.output.filename = 'js/[name].[chunkhash].min.js';
config.output.path = path.join(__dirname, '../../build/');

cssLoader.unshift(MiniCssExtractPlugin.loader);

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
  new MiniCssExtractPlugin({
    filename: 'css/[name].[chunkhash].min.css',
  }),
  new CleanPlugin([config.output.path], {
    root: path.resolve(__dirname, '../../'),
  }),
  new BabiliPlugin(),
);

module.exports = config;
