const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/scripts/index.js',

  plugins: [new HtmlWebpackPlugin({ template: './src/template.html' })],
};
