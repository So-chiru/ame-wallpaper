const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const dev = process.env.NODE_ENV !== 'production'

module.exports = env => {
  return {
    mode: dev ? 'development' : 'production',
    entry: {
      app: ['babel-polyfill', path.resolve('src', 'index.tsx')],
      generator: ['babel-polyfill', path.resolve('generator_src', 'index.tsx')]
    },
    output: {
      publicPath: '/',
      path: env.DIST_PATH
        ? path.resolve(env.DIST_PATH)
        : path.resolve(__dirname, './dist')
    },
    module: {
      rules: [
        {
          exclude: /(node_modules|_old_src|(sa|sc|c)ss)/,
          test: /\.js|\.tsx?$/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                '@babel/preset-react',
                '@babel/preset-typescript'
              ]
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
          test: /\.js(\?.*)?$|\.tsx?/i,
          terserOptions: {
            mangle: true,
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
      // new HtmlWebpackPlugin({
      //   template: './osrc/views/index.html',
      //   filename: 'index.html',
      //   inject: false
      // }),
      new HtmlWebpackPlugin({
        template: './generator_src/views/generator.html',
        filename: 'generator.html',
        inject: false
      }),
      // new CopyWebpackPlugin({
      //   patterns: [{ from: 'src/root', to: '.' }]
      // }),
      new CopyWebpackPlugin({
        patterns: [{ from: 'src/public', to: '.' }]
      }),
      new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[id].css'
      })
    ],
    resolve: {
      extensions: ['.js', '.ts', '.tsx', '.css', '.scss'],
      modules: ['node_modules'],
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '@o': path.resolve(__dirname, 'osrc'),
        '@g': path.resolve(__dirname, 'generator_src')
      }
    }
  }
}
