'use strict'

const path = require('path')
const HtmlWebpackPlugin  = require('html-webpack-plugin')

module.exports = {
	mode: 'production',
  devtool: 'cheap-module-source-map',
  entry: './src/frontend/index.js',
  output: {
    path: path.resolve(__dirname + '/dist'),
    filename: '[name]-bundle.js',
    publicPath: ''
  },
  resolve: {
    extensions: ['.js']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.css$/i,
        exclude: /node_modules/,
        use: [
          {
						loader: 'style-loader'
					},
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: {
                localIdentName: '[path][name]__[local]--[hash:base64:5]'
              }
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
            }
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif)/,
        loader: 'url-loader?limit=10000&name=images/[name].[ext]'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: __dirname + '/src/frontend/index.html',
      filename: 'index.html',
      index: 'body'
    })
  ]
};
