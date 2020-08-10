const path = require('path');
const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const common = require('./webpack.common');

module.exports = merge(common, {
  entry: {
    app: './src/js/app.js',
    kitchensink: './src/js/kitchensink.js',
  },
  mode: 'development',
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
    }),
    new HtmlWebpackPlugin({ // This plugin takes the template and outputs a new HTML file at the public folder. it also adds <link> css and <script> JS tags
      filename: 'index.html',
      template: 'src/index.html',
      favicon: 'src/img/icons/disc.ico',
      chunks: ['app'],
    }),
    new HtmlWebpackPlugin({ // This plugin takes the template and outputs a new HTML file at the public folder. it also adds <link> css and <script> JS tags
      filename: 'kitchensink.html',
      template: 'src/kitchensink.html',
      favicon: 'src/img/icons/disc.ico',
      chunks: ['kitchensink'],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|woff|ttf)$/i,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            publicPath: '../img/',
            outputPath: 'img',
          },
        },
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'js/[name].js',
  },
});
