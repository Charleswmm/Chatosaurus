const path = require('path');
const common = require('./webpack.common');
const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {
  mode: 'development',
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'assets/style.css',
    }),
    new HtmlWebpackPlugin({                  // This plugin takes the template and outputs a new HTML file at the public folder. it also adds <link> css and <script> JS tags
      filename: 'index.html',
      template: 'src/template.html',
      //    favicon: 'src/img/disc.ico',
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
            outputPath: 'assets'
          }
        },
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: '[name].js',
  }
});