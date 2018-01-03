const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')

const srcPath = path.join(__dirname, '../src')
const outputPath = path.join(__dirname, '../dist')

module.exports = {
  devtool: 'eval-source-map',
  context: srcPath,
  entry: ['babel-polyfill', './app.js'],
  devServer: {
    // 配置直接输入网址无法访问
    historyApiFallback: true
  },
  output: {
    path: outputPath,
    filename: 'bundle.js',
    chunkFilename: '[name]-[id].[chunkhash:8].bundle.js'
  },
  stats: {
    colors: true
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {loader: 'css-loader', options: {importLoaders: 1}},
          {loader: 'postcss-loader',
            options: {
              sourceMap: true,
              config: {
                path: 'postcss.config.js'
              }
            }},
          'sass-loader'
        ]
      },
      {
        test: /\.(less|css)$/,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { importLoaders: 1 } },
          {loader: 'postcss-loader',
            options: {
              sourceMap: true,
              config: {
                path: 'postcss.config.js'
              }
            }},
          'less-loader',
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg|ttf|woff2?|eot)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'commons',
      filename: 'commons.js'
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      title: 'react-mobx-router3-webpack3-template',
      template: path.join(srcPath, 'index.ejs'),
      inject: 'body',
      hash: true
    }),
    new webpack.NamedModulesPlugin()
  ]
}
