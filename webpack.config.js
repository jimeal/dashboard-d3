const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: {
    main: './js/app.js',
  },
  output: {
    filename: '[name].js',
    // path: path.resolve(__dirname, './dist'),
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: [
          // 순서 중요!
          'style-loader',
          { loader: "css-loader", options: { url: false } },
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
    }),
    new CopyPlugin({
      patterns: [
        { from: 'static' },
        {
          from: "./js/data/korea.json"
        }
      ]
    })
  ],
  devServer: {
    host: 'localhost',
    port: 8080,
    hot: true
  }
}