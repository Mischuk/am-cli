#!/usr/bin/env node
const modules = "./node_modules/am-cli";
const execa = require("execa");
const Listr = require("listr");
const inquirer = require("inquirer");
const fse = require("fs-extra");
const fs = require("fs");
let dependencies = [
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
const copyFolders = (froma, toa) => {
  fse.copy(froma, toa, function (err) {
    if (err) return console.error(err);
  });
};

const copyFiles = (froma, toa) => {
  fs.copyFile(froma, toa, function (err) {
    if (err) return console.error(err);
  });
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
        copyFiles(`${modules}/source/common/.prettierrc`, "./.prettierrc");
        copyFiles(
          `${modules}/source/common/.stylelintignore`,
          "./.stylelintignore",
        );
        copyFiles(`${modules}/source/common/.stylelintrc`, "./.stylelintrc");
      },
    },
    {
      title: "Add styles",
      task: () => {
        copyFolders(`${modules}/source/common/styles`, "./src/styles");
      },
    },
    {
      title: "Running npm install",
      task: () => execa("npm", ["install", ...dependencies]),
    },
  ]).run();
};

const runJavascriptApp = () => {
  new Listr([
    {
      title: "Creating react app...",
      task: () => execa("npx create-react-app ."),
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
