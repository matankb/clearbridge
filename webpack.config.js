const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: {
    student: ['babel-polyfill', './src/client/dashboard/student/js/index.js'],
    teacher: ['babel-polyfill', './src/client/dashboard/teacher/js/index.js'],
    admin: ['babel-polyfill', './src/client/dashboard/admin/js/index.js'],
  },
  output: {
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
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false, // disable warnings
      }
    }),
  ],
  resolve: {
    root: path.resolve('./src/client/dashboard/'),
  },
};
