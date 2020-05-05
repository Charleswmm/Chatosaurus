const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/js/app.js',
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'assets/style.css',                      // To replace cached files replace with 'assets/style-[chunkhash:10].css' to get hashed.css. The hash relates to the css chunk of content
    }),
    new HtmlWebpackPlugin({                             // This plugin takes the template and outputs a new HTML file at the public folder. it also adds <link> css and <script> JS tags
      filename: 'index.html',
      template: 'src/template.html',
  //    favicon: 'src/img/disc.ico',
    })
  ],
  module: {
    rules: [
      {
        test: /\.scss$/i,                                                      // css loader for picking up the source style sheets and outputting and single style sheet at public
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],       // sass-loader turns scss to css
      },
      {
        test: /\.svg/,                                                          // grabs the svgs (that are less than 8kb) from background url and embeds them into the output app.scss
        exclude: /fonts/,
        use: {
          loader: 'svg-url-loader',
          options: {
            limit: 8000,
          },
        },
      },
      {
        test: /\.html$/,                                                       // html-loader imports every loadable attributes (for example - <img src="image.png">) so then the below file-loader
        use: {                                                                 // can move the file and change the 'src' in the output HTML file
          loader: 'html-loader'
        },
      },
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
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ],
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: '[name].js',                         // To replace cached files replace with '[name]-[contentHash:10].js' to get a hashed.js file. The hash is related to the content
  }
};