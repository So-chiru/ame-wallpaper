const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const dev = process.env.NODE_ENV !== 'production'

module.exports = {
  mode: dev ? 'development' : 'production',
  entry: {
    app: ['babel-polyfill', path.resolve('src', 'index.js')]
  },
  output: {
    publicPath: '/',
    //path: path.resolve(__dirname, './dist')
    path: path.resolve(
      'C:/Program Files (x86)/Steam/steamapps/common/wallpaper_engine/projects/myprojects/index'
    )
  },
  module: {
    rules: [
      {
        exclude: /(node_modules|_old_src|(sa|sc|c)ss)/,
        test: /\.js|\.ts$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { url: false }
          },
          'sass-loader'
        ]
      },
      {
        test: /\.pug$/,
        use: ['pug-loader']
      },
      {
        test: /\.(png|jpg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 30000,
              name: '[name].[ext]'
            }
          }
        ]
      }
    ]
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        test: /\.js(\?.*)?$/i,
        terserOptions: {
          mangle: true,
          beautify: false,
          comments: false,
          output: {
            comments: false
          }
        },
        extractComments: false
      })
    ]
  },
  plugins: [
    //new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      DEBUG: JSON.stringify(dev),
      VERSION: JSON.stringify(require('./package.json').version)
    }),
    //new webpack.HotModuleReplacementPlugin({}),
    new HtmlWebpackPlugin({
      template: './src/views/index.pug',
      filename: 'index.html',
      inject: false
    }),
    new CopyWebpackPlugin([{ from: 'src/root', to: '.' }]),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    })
  ],
  resolve: {
    extensions: ['.js', '.css'],
    modules: ['node_modules']
  }
}
