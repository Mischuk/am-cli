const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const webpack = require("webpack");

const paths = {
  src: "src",
  dist: "dist",
};

module.exports = {
  // Entries
  entry: { index: path.resolve(__dirname, paths.src, "index.js") },
  output: {
    path: path.resolve(__dirname, paths.dist),
    filename: "bundle.js",
  },

  // Devtool
  devtool: "source-map",
  mode: "development",

  // Modules
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
            },
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
    ],
  },

  // Optimization
  optimization: {
    splitChunks: { chunks: "all" },
  },

  // Server
  devServer: {
    port: 3000,
    clientLogLevel: "error",
    inline: true,
    hot: false,
    open: true,
  },

  // Plugins
  plugins: [
    new HtmlWebpackPlugin({
      title: "App",
      template: path.resolve(__dirname, paths.src, "index.html"),
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
};
