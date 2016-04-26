const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: {
    student: ['react-hot-loader/patch', 'webpack-hot-middleware/client', './client/dashboard/student/js/index.js'],
    teacher: ['react-hot-loader/patch', 'webpack-hot-middleware/client','./client/dashboard/teacher/js/index.js'],
    admin: ['react-hot-loader/patch', 'webpack-hot-middleware/client','./client/dashboard/admin/js/index.js'],
  },
  output: {
    publicPath: '/dashboard/build/js/',
    path: path.join(__dirname, 'client/dashboard/build/js'),
    filename: '[name].min.js',
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-0'],
          plugins: [
            'react-html-attrs',
            'transform-class-properties',
            'transform-decorators-legacy',
          ],
        },
      },
    ],
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ],
};
