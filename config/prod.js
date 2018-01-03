const path = require('path')
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const srcPath = path.join(__dirname, '../src')
const outputPath = path.join(__dirname, '../dist')

module.exports = {
  devtool: false,
  context: srcPath,
  entry: ['babel-polyfill', './app.js'],
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
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [{loader: 'css-loader', options: {importLoaders: 2, minimize: true}},
            {loader: 'postcss-loader',
              options: {
                sourceMap: false,
                config: {
                  path: 'postcss.config.js'
                }
              }},
            'sass-loader']
        })
      },
      {
        test: /\.(less|css)$/,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { importLoaders: 1 } },
          {loader: 'postcss-loader',
            options: {
              sourceMap: false,
              config: {
                path: 'postcss.config.js'
              }
            }},
          'less-loader'
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
    new CleanWebpackPlugin('dist', {
      root: path.resolve(__dirname, '../'),
      verbose: true
    }),
    new ExtractTextPlugin('[name].[chunkhash:8].css'), // css js分离插件
    new webpack.optimize.CommonsChunkPlugin({
      name: 'commons',
      filename: 'commons.js'
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      title: 'react-mobx-router3-webpack3-template',
      template: 'index.ejs',
      inject: 'body',
      hash: true
    }),
    new FaviconsWebpackPlugin({
      logo: path.join(__dirname, '../public/images/favicon.png')
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      comments: false,
      compress: {
        drop_console: true,
        warnings: false
      }
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.NamedModulesPlugin()
  ]
}
