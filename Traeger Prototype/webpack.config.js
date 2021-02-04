const autoprefixer = require('autoprefixer');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = [{
  mode: 'development',
  entry: ['./scss/app.scss', './scripts/app.js'],
  output: {
    filename: 'bundle.js',
  },
  devtool: 'inline-source-map',

  module: {
    rules: [
      {
        test: /\.(ttf|eot|woff|woff2|svg|otf)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'fonts/'
          },
        },
      },
      {
        test: /\.scss$/,

        use: [
          {
            loader: 'file-loader',
            options: {
              name: './styles/bundle.css',
            },
          },
          {loader: 'extract-loader'},
          {loader: 'css-loader'},
          {loader: 'sass-loader',
            options: {
              // Prefer Dart Sass
              implementation: require('sass'),

              // See https://github.com/webpack-contrib/sass-loader/issues/804
              webpackImporter: false,
              sassOptions: {
                includePaths: ['./node_modules'],
              },
            }
          }
        ],
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options:{
          presets: ['@babel/preset-env']
        }
      }
    ]
  },
}];
