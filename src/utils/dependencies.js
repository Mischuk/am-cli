export const stylesDeps = ["node-sass", "ress"];

export const linterDeps = [
  "stylelint",
  "prettier",
  "stylelint-prettier",
  "stylelint-config-prettier",
  "stylelint-order",
  "stylelint-scss",
  "stylelint-no-unsupported-browser-features",
];

export const reactDeps = ["prop-types", "react-router-dom"];

export const reduxDeps = [
  "redux",
  "react-redux",
  "redux-logger",
  "redux-thunk",
];

export const jsDeps = [
  "@babel/core",
  "@babel/preset-env",
  "babel-loader",
  "css-loader",
  "eslint",
  "eslint-config-airbnb",
  "html-webpack-plugin",
  "prettier",
  "sass",
  "sass-loader",
  "style-loader",
  "webpack",
  "webpack-cli",
  "webpack-dev-server",
  "npm-add-script",
];

export function getDeps(options) {
  let currentDepsToInstall = [...stylesDeps, ...linterDeps];

  if (options.template === "react" || options.template === "react-redux") {
    currentDepsToInstall = [...currentDepsToInstall, ...reactDeps];
  }

  if (options.redux) {
    currentDepsToInstall = [...currentDepsToInstall, ...reduxDeps];
  }

  if (options.template === "javascript") {
    currentDepsToInstall = [...currentDepsToInstall, ...jsDeps];
  }

  return currentDepsToInstall;
}
