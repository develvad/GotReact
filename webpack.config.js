var debug = true;
var webpack = require('webpack');
var path = require('path');
module.exports = {
  devtool: debug ? 'inline-sourcemap' : null,
  entry: path.join(__dirname, 'src/app.js'),
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
            presets: ['@babel/react', '@babel/preset-env'],
            plugins: ['@babel/proposal-class-properties', ['@babel/plugin-proposal-decorators', { decoratorsBeforeExport: false} ] ]
        }
      }
    ]
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },

};