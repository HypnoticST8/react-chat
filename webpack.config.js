'use strict'

const path = require('path')
const HtmlWebpackPlugin  = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: './src/frontend/index.tsx',
  output: {
    path: path.resolve(__dirname + '/dist'),
    filename: '[name]-bundle.js',
    publicPath: ''
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: ['@babel/plugin-proposal-class-properties']
          }
        },
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: 'ts-loader'
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
              plugins: (loader) => [
                require('postcss-import')({ root: loader.resourcePath }),
                require('autoprefixer')()
              ]
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2)$/,
        loader: 'url-loader'
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
  ],
};
