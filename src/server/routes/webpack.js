const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const config = require('../../../config/webpack.config.dev'); // use dev config

const isProduction = process.env.NODE_ENV === 'production';

const compiler = webpack(config);
const opts = {
  noInfo: true, // only show 'webpack compiled'
  publicPath: config.output.publicPath,
};

module.exports = function(app) {
  if (!isProduction) {

    // generate middleware
    const compiledDevMiddleware = webpackDevMiddleware(compiler, opts);
    const copiledHotMiddleware = webpackHotMiddleware(compiler);

    // apply middleware
    app.use(compiledDevMiddleware);
    app.use(copiledHotMiddleware);

  }
};
