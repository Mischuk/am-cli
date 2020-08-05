#!/usr/bin/env node
const execa = require("execa");
const Listr = require("listr");
const UpdaterRenderer = require("listr-update-renderer");
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
  copyFiles(`./assets/common/.prettierrc`, "./.prettierrc");
  copyFiles(`./assets/common/.stylelintignore`, "./.stylelintignore");
  copyFiles(`./assets/common/.stylelintrc`, "./.stylelintrc");

  if (requireEslint) {
    copyFiles(`./assets/javascript/.eslintrc`, "./.eslintrc");
    copyFiles(`./assets/javascript/babel.config.json`, "./babel.config.json");
  }
};

const copyStyles = () => {
  copyFolders(`./assets/common/styles`, "./src/styles");
};

const installDependencies = dependencies => {
  let deps = dependencies.join(" ");
  return execa(deps);
};

function getSubtasks(parentTask, dependencies) {
  let tasks = [];
  const totalPackages = dependencies.length;
  let installProgress;
  const updateProgress = function (index) {
    installProgress = `${index + 1} / ${totalPackages}`;
  };
  updateProgress(0);

  dependencies.forEach((dep, index) => {
    tasks.push({
      title: `${dep}`,
      task: (ctx, task) => {
        let args = ["install", "--save", "--save-exact"];
        parentTask.title = `Install dependencies: ${dep} [${installProgress}]`;
        updateProgress(index + 1);
        return execa("npm", args.concat(dep, ["--verbose"]));
      },
    });
  });

  return tasks;
}

function generateLists(deps) {
  return new Listr(
    [
      {
        title: "Install dependencies...",
        task: (parentCtx, parentTask) => {
          const subtasks = getSubtasks(parentTask, deps);
          const list = new Listr(subtasks, { concurrent: false });
          const runFn = list.run.bind(list);

          list.run = () => {
            return runFn().then(() => {
              parentTask.title = "Install dependencies";
            });
          };

          return list;
        },
      },
    ],
    {
      renderer: UpdaterRenderer,
      collapse: false,
      showSubtasks: false,
    },
  );
}

const runReactApp = () => {
  const assets = new Listr([
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
  ]);

  const installDependencies = generateLists(reactDependencies);

  assets.run().then(() => {
    installDependencies.run();
  });
};

const runJavascriptApp = () => {
  const assets = new Listr([
    {
      title: "Add linter rules",
      task: () => {
        if (!fs.existsSync(src)) {
          fs.mkdirSync(src);
        }
        copyLinterRules(true);
        execa("npm", ["init", "-y"]);
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
        copyFiles("./assets/javascript/index.html", "./src/index.html");
        copyFiles("./assets/javascript/index.js", "./src/index.js");
        copyFiles(
          `./assets/javascript/webpack.config.js`,
          "./webpack.config.js",
        );
      },
    },
    {
      title: "Initial package.json",
      task: () => execa("npm", ["init", "-y"]),
    },
  ]);

  const installDependencies = generateLists(jsDependencies);
  const addScripts = new Listr([
    {
      title: "Add scripts to package.json",
      task: () => {
        return execa("npx", [
          "npmAddScript",
          "-k",
          "start",
          "-v",
          "webpack-dev-server",
        ]);
      },
    },
  ]);
  assets.run().then(() => {
    installDependencies.run().then(() => addScripts.run());
  });
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
