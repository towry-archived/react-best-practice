var path = require('path');
var webpack = require('webpack');
var pkg = require('./package.json');

module.exports = {
  entry: [
    'webpack-dev-server/client?http://localhost:' + pkg.server.port,
    'webpack/hot/dev-server',
    './scripts/index'
  ],
  devServer: {
    contentBase: './build',
    hot: true,
    inline: true,
    noInfo: true,
    quiet: true
  },
  devtool: 'eval-source-map',
  output: {
    path: path.join(__dirname, './build'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  resolve: {
    extensions: ['', '.js'],
    modulesDirectories: ['node_modules']
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loaders: ['react-hot', 'babel'],
      include: path.join(__dirname, 'scripts')
    }]
  }
}
