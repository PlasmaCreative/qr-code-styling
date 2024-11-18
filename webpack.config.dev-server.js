const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require("copy-webpack-plugin");
const commonConfig = require('./webpack.config.common.js');

module.exports = merge(commonConfig, {
  mode: 'development',
  devServer: {
    watchFiles: ["./"], // string [string] object [object]
    port: 3000,
    open: true,
    hot: true,
  },
  devtool: "inline-source-map",
  plugins: [
    new CopyPlugin({
      patterns: [
          { from: "src/assets", to: "" } //to the dist root directory
      ],
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      inject: 'head',
      scriptLoading: 'blocking',
    })
  ]
});
