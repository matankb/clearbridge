const path = require('path');
const HtmlPlugin = require('html-webpack-plugin');

const ENTRY_DIR = path.resolve(__dirname, '../../src/client/');

function createEntry(name) {
  return ['url-polyfill', 'whatwg-fetch', path.resolve(ENTRY_DIR, name)];
}

function createHtmlPlugin(name) {
  return new HtmlPlugin({
    filename: `${name}/index.html`,
    template: path.resolve(ENTRY_DIR, `${name}/index.html`),
    chunks: [name],
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
        test: /\.png$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: 'assets/[hash].[ext]',
          },
        }],
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'babel-loader',
          },
          {
            loader: 'react-svg-loader',
            options: {
              svgo: {
                plugins: [{ removeTitle: false }],
                floatPrecision: 2,
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    createHtmlPlugin('admin'),
    createHtmlPlugin('teacher'),
    createHtmlPlugin('student'),
  ],
};
