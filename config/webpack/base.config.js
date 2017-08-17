const path = require('path');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');

const ENTRY_DIR = path.resolve(__dirname, '../../src/client/');

function createEntry(name) {
  return ['url-polyfill', 'whatwg-fetch', path.resolve(ENTRY_DIR, name)];
}

function createHtmlPlugin(name) {
  const types = ['admin', 'teacher', 'student'];
  types.splice(types.indexOf(name), 1);
  return new HtmlPlugin({
    filename: `${name}/index.html`,
    template: path.resolve(ENTRY_DIR, `${name}/index.html`),
    excludeChunks: types,
  });
}

module.exports = {
  entry: {
    admin: createEntry('admin/js/index.js'),
    teacher: createEntry('teacher/js/index.js'),
    student: createEntry('student/js/index.js'),
  },
  output: {
    publicPath: '/',
  },
  resolve: {
    alias: {
      '~': ENTRY_DIR,
    },
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        use: ['babel-loader'],
      },
      {
        test: /\.css?$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract({
          use: [{
            loader: 'css-loader',
            options: {
              minimize: true,
            },
          }, 'less-loader'],
          fallback: 'style-loader',
        }),
      },
      {
        test: /\.png$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: 'assets/[hash].[ext]',
          },
        }],
      },
    ],
  },
  plugins: [
    createHtmlPlugin('admin'),
    createHtmlPlugin('teacher'),
    createHtmlPlugin('student'),
  ],
};
