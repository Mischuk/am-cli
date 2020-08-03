const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  target: "node",
  entry: ["./index.js"],

  output: {
    path: __dirname + "/dist",
    filename: "app.js",
    libraryTarget: "commonjs2",
  },

  mode: "production",

  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
          {
            loader: "shebang-loader",
          },
        ],
      },
    ],
  },

  resolve: {
    extensions: [".js"],
  },

  plugins: [
    new CopyPlugin({
      patterns: [{ from: "./source", to: "./source" }],
    }),
  ],
};
