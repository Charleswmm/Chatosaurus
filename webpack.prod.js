const path = require('path');
const common = require('./webpack.common');
const merge = require('webpack-merge');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');          // part of webpack modules, package.json addition not required
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
  plugins: [
    new CleanWebpackPlugin(),                          // deletes old hashed files
    new MiniCssExtractPlugin({
      filename: 'assets/style-[chunkhash:10].css',    // To replace cached files replace with 'assets/style-[chunkhash:10].css' to get hashed.css. The hash relates to the css chunk of content
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html',
      //favicon: 'src/img/disc.ico',
      minify: {                                       // minifies HTML
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
      },
    }),
  ],
  optimization: {
    minimizer: [
      new OptimizeCssAssetsPlugin(),                   // minifies CSS
      new TerserPlugin(),                              // minifies JS
    ]
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|woff|ttf)$/i,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name]-[hash:10].[ext]',            // hashes assets
            outputPath: 'assets'
          }
        },
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: '[name]-[contentHash:10].js',           // To replace cached files replace with '[name]-[contentHash:10].js' to get a hashed.js file. The hash is related to the content
  }
});