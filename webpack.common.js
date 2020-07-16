const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');

module.exports = {
  plugins: [
    new MomentLocalesPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.scss$/i, // css loader for picking up the source style sheets and outputting and single style sheet at public
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'], // sass-loader turns scss to css
      },
      {
        test: /\.svg/, // grabs the svgs (that are less than 8kb) from background url and embeds them into the output app.scss
        exclude: /fonts/,
        use: {
          loader: 'svg-url-loader',
          options: {
            limit: 4096,
            fallback: 'file-loader', // If a svg is larger the 4kb webpack will fallback to use file-loader
            name: '[name].[ext]', // The options after the fallback are the options for the fallback and not svg-url-loader
            publicPath: '../img/',
            outputPath: 'img',
          },
        },
      },
      {
        test: /\.html$/, // html-loader imports every loadable attributes (for example - <img src="image.png">) so then the below file-loader
        use: { // can move the file and change the 'src' in the output HTML file
          loader: 'html-loader',
        },
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
};
