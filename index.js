#!/usr/bin/env node
const execa = require("execa");
const Listr = require("listr");
const inquirer = require("inquirer");
const runReactApp = () => {
  new Listr([
    {
      title: "Creating react app...",
      task: () => execa("npx create-react-app ."),
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
