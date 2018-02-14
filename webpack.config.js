var webpack = require('webpack'),
path = require('path');
console.log("!!!!!!!!!!!!!!", __dirname);
module.exports = {
//   entry: './payload/test.js',
  entry: './main.js',
  output: {
    path: path.resolve(__dirname),
    filename: './bundle.js'
  },
  node: {
    fs: "empty"
  },
  target: 'node',
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      }
    ]
  }
}