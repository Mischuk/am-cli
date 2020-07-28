#!/usr/bin/env node
const modules = "./node_modules/am-cli";
const execa = require("execa");
const Listr = require("listr");
const inquirer = require("inquirer");
const fse = require("fs-extra");
const fs = require("fs");
const path = require("path");
const src = "./src";
const reactDependencies = [
  "stylelint",
  "react-transition-group",
  "node-sass",
  "prop-types",
  "ress",
  "react-router-dom",
  "prettier",
  "stylelint-prettier",
  "stylelint-config-prettier",
  "stylelint-order",
  "stylelint-scss",
  "stylelint-no-unsupported-browser-features",
];

const jsDependencies = [
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
  "stylelint",
  "stylelint-config-prettier",
  "stylelint-no-unsupported-browser-features",
  "stylelint-order",
  "stylelint-prettier",
  "stylelint-scss",
  "webpack",
  "webpack-cli",
  "webpack-dev-server",
  "npm-add-script",
];

const copyFolders = (from, to) => {
  fse.copy(path.resolve(__dirname, from), to, function (err) {
    if (err) return console.error(err);
  });
};

const copyFiles = (from, to) => {
  fs.copyFile(path.resolve(__dirname, from), to, function (err) {
    if (err) return console.error(err);
  });
};

const copyLinterRules = (requireEslint = false) => {
  copyFiles(`./source/common/.prettierrc`, "./.prettierrc");
  copyFiles(`./source/common/.stylelintignore`, "./.stylelintignore");
  copyFiles(`./source/common/.stylelintrc`, "./.stylelintrc");

  if (requireEslint) {
    copyFiles(`./source/js/.eslintrc`, "./.eslintrc");
    copyFiles(`./source/js/babel.config.json`, "./babel.config.json");
  }
};

const copyStyles = () => {
  copyFolders(`./source/common/styles`, "./src/styles");
};

const installDependencies = dependencies => {
  execa("npm", ["install", ...dependencies]);
};

const runReactApp = () => {
  new Listr([
    {
      title: "Install create-react-app",
      task: () => execa("npx create-react-app ."),
    },
    {
      title: "Add linter rules",
      task: () => {
        copyLinterRules();
      },
    },
    {
      title: "Add styles",
      task: () => {
        copyStyles();
      },
    },
    {
      title: "Install dependencies",
      task: () => installDependencies(reactDependencies),
    },
  ]).run();
};

const runJavascriptApp = () => {
  new Listr([
    {
      title: "Add linter rules",
      task: () => {
        if (!fs.existsSync(src)) {
          fs.mkdirSync(src);
        }
        copyLinterRules(true);
      },
    },
    {
      title: "Add styles",
      task: () => {
        copyStyles();
      },
    },
    {
      title: "Add webpack entries",
      task: () => {
        copyFiles("./source/js/index.html", "./src/index.html");
        copyFiles("./source/js/index.js", "./src/index.js");
        copyFiles(`./source/js/webpack.config.js`, "./webpack.config.js");
      },
    },
    {
      title: "Initial package.json",
      task: () => execa("npm", ["init", "-y"]),
    },
    {
      title: "Install dependencies",
      task: () => installDependencies(jsDependencies),
    },
    {
      title: "Add scripts to package.json",
      task: () => {
        execa("npm npmAddScript", ["-k", "start", "-v", "webpack-dev-server"]);
        execa("npm npmAddScript", ["-k", "build", "-v", "webpack"]);
      },
    },
  ]).run();
};

inquirer
  .prompt([
    {
      type: "list",
      name: "projectType",
      message: "Your project will based on",
      choices: ["JS", "React"],
    },
  ])
  .then(answers => {
    let selectedResult = answers.projectType;

    switch (selectedResult) {
      case "React":
        runReactApp();
        break;
      case "JS":
        runJavascriptApp();
        break;
      default:
        break;
    }
  });
