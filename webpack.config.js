const path = require('path');

module.exports = {
  mode: 'development',
  entry: './js/main.jsx',
  output: {
    path: path.join(__dirname, '/static/js/'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
