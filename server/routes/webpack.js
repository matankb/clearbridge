const webpack = require('webpack');
const webpackConfig = require('../../webpack.config');
const compiler = webpack(webpackConfig);

module.exports = function(app) {

  if (process.env.NODE_ENV !== 'production') {
    app.use(require('webpack-dev-middleware')(compiler, {
      noInfo: true,
      publicPath: webpackConfig.output.publicPath,
    }));
    app.use(require('webpack-hot-middleware')(compiler));
  }

};
