const webpack = require('webpack');
const merge = require("webpack-merge");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const globalCss = new ExtractTextPlugin('styles-global.css');

const common = require('./webpack.common');

const devConfig = merge([{
  devServer: {
    historyApiFallback: true,
    contentBase: './dist',
    hot: true,
  },
  devtool: 'cheap-module-eval-source-map',
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 100000,
          },
        },
      },
      {
        test: /^((?!semantic|leaflet).)*\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader', options: {modules: true, importLoaders: 1, localIdentName: '[name]__[hash:base64:5]'}
          },
          {
            loader: 'postcss-loader', options: {
              plugins: [
                require('postcss-import'),
                require('postcss-cssnext'),
              ]
            }
          },
        ]
      },
      {
        test: /(semantic\.css|leaflet\.css)/,
        use: [
          'style-loader',
          {
            loader: 'css-loader', options: {modules: false, importLoaders: 1}
          },
          {
            loader: 'postcss-loader', options: {
              plugins: [
                require('postcss-import'),
                require('postcss-cssnext'),
              ]
            }
          },
        ]
      },
      // {
      //   test: /\.less$/,
      //   use: ['style-loader', 'css-loader', 'less-loader']
      // },
      // {
      //   test: /semantic\.css/,
      //   use: globalCss.extract({
      //     fallback: 'style-loader',
      //     use: [
      //       {loader: 'css-loader', options: {modules: false, importLoaders: 1}},
      //       {loader: 'postcss-loader', options: {
      //         plugins: [
      //           require('postcss-import'),
      //           require('postcss-cssnext'),
      //         ]
      //       }},
      //     ]
      //   })
      // }
    ]
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    globalCss
  ]
}]);

module.exports = merge(common, devConfig);
