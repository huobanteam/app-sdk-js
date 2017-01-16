var webpack = require('webpack');
var path = require('path');
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var env = require('yargs').argv.mode;

var isProd = env === 'build'
var libraryName = 'HuobanAppSDK';
var plugins = [], outputFile;

if (isProd) {
  plugins.push(new UglifyJsPlugin({ minimize: true, compressor: { warnings: false } }));
  outputFile = libraryName + '.min.js';
} else {
  outputFile = libraryName + '.js';
}

var config = {
  entry: __dirname + '/src/index.js',
  devtool: isProd ? '' : 'source-map',
  output: {
    path: __dirname + '/lib',
    filename: outputFile,
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loader: 'eslint',
        exclude: /node_modules/
      }
    ],
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    root: path.resolve('./src'),
    // fallback: [path.join(__dirname, 'node_modules')],
    extensions: ['', '.js'],
    alias: {}
  },
  plugins: plugins
};

module.exports = config;