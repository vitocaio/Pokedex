const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const extractPlugin = new ExtractTextPlugin({
  filename: 'style.css'
})

module.exports = {
  entry: [
    'babel-polyfill',
    './src/js/app.js',
    './src/styles/style.scss'
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.bundle.js',
    publicPath: './'
  },
  module: {
    rules: [{
      test: /\.js?$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        presets: ['es2015', 'stage-2']
      }
    },
    {
      enforce: 'pre',
      test: /\.js?$/,
      loader: 'standard-loader',
      exclude: /(node_modules|bower_components)/,
      options: {
        parser: 'babel-eslint'
      }
    },
    {
      test: /\.scss$/,
      use: extractPlugin.extract({
        use: ['css-loader', 'sass-loader']
      })
    },
    {
      test: /\.html$/,
      use: extractPlugin.extract({
        use: ['html-loader']
      })
    },
    {
      test: /\.(png|woff|woff2|eot|ttf|svg)$/,
      loader: 'url-loader?limit=100000'
    }]
  },
  plugins: [
    extractPlugin,
    new HtmlWebpackPlugin()
  ]
}
