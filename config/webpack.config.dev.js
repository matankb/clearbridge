const webpack = require('webpack');
const path = require('path');

const DashboardPlugin = require('webpack-dashboard/plugin');

module.exports = {
  devtool: 'inline-eval-cheap-source-map',
  entry: {
    student: ['react-hot-loader/patch', 'webpack-hot-middleware/client', 'babel-polyfill', './src/client/dashboard/student/js/index.js'],
    teacher: ['react-hot-loader/patch', 'webpack-hot-middleware/client', 'babel-polyfill', './src/client/dashboard/teacher/js/index.js'],
    admin: ['react-hot-loader/patch', 'webpack-hot-middleware/client', 'babel-polyfill', './src/client/dashboard/admin/js/index.js'],
  },
  output: {
    publicPath: '/dashboard/build/js/',
    path: path.join(__dirname, 'src/client/dashboard/build/js'),
    filename: '[name].min.js',
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
      },
      {
        test: /\.css?$/,
        loader: 'style-loader!css-loader',
      },
      {
        test: /\.scss$/,
        loader: 'style-loader!css-loader!sass-loader',
      },
    ],
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ],
  resolve: {
    root: path.resolve('./src/client/dashboard/'),
  },
};
