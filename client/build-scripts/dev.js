const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackConfig = require('./webpack.dev.config');
const port = 8082;

const options = {
  publicPath: webpackConfig.output.publicPath,
  hot: true,
  inline: true,
  contentBase: 'public',
  stats: {
    colors: true
  },
  historyApiFallback: true
};

const server = new WebpackDevServer(webpack(webpackConfig), options);

server.listen(port, 'localhost', function (err) {
  if (err) {
    console.log(err);
  }
  console.log('WebpackDevServer listening at localhost:', port);
});
