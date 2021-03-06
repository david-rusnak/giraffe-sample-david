var path = require('path');
var webpack = require('webpack');

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: './client/index.jsx',
  module: {
    rules: [
      {
        test: /\.(js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
            ],
          },
        },
      },

      { test: /\.css$/,
        use: {
          loader: "css-loader" 
        }
      },
    ],
  },
  resolve: {
    extensions: ['.jsx', '.ts', '.js', '.css'],
    modules: ['node_modules'],  
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
};
