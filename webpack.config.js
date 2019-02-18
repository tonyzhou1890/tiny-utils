const path = require('path')
const isDev = process.env.NODE_ENV === 'development';
const HTMLPlugin = require('html-webpack-plugin')
const OpenBrowserPlugin = require('open-browser-webpack-plugin')
const webpack = require('webpack');


const config = {
  target: 'web',
  entry: path.join(__dirname,'test/index.js'),
  output:{
    filename:"bundle.[hash:8].js",
    path:path.join(__dirname,'dist')
  },
  module: {
    rules: [
      {
        test: /\.md$/,
        use: [
          {
            loader: "html-loader"
          },
          {
            loader: "markdown-loader",
            options: {
            }
          }
        ]
      }
    ]
  }
}

if (isDev){
  config.devtool = '#cheap-module-eval-source-map'
  config.devServer = {
    port: 8000,
    host: 'localhost',
    overlay: {
      errors: true,
    },
    hot: true
  }
  config.plugins = [
    new OpenBrowserPlugin({ url: 'http://localhost:8000' }),
    new HTMLPlugin({
      template: path.join(__dirname,'test/index.html'),
      title: 'tiny-utils.js'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin
  ]
}


module.exports = config;