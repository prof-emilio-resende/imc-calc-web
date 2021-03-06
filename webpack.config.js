const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const plugins = [new MiniCssExtractPlugin()];

const config = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  devServer: {
    contentBase: path.join(__dirname, "/dist/"),
    compress: true,
    port: 8000,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {loader: "babel-loader"}
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      }
    ],
  }
};

module.exports = (env, argv) => {
  if (argv.mode !== "production") {
    config.devtool = 'source-map';
    plugins.push(
      new HtmlWebpackPlugin({
        hash: true,
        minify: false,
        filename: "index.html",
        template: __dirname + "/main.html",
      })
    );
  }

  if (argv.mode === "production") {
    plugins.push(
      new HtmlWebpackPlugin({
        hash: true,
        minify: {
          html5: true,
          collapseWhitespace: true,
          removeComments: true,
        },
        filename: "index.html",
        template: __dirname + "/main.html",
      })
    );
  }
  config.plugins = plugins;
  config.mode = argv.mode;

  return config;
};
