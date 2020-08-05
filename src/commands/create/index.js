import chalk from "chalk";
import fs from "fs";
import ncp from "ncp";
import path from "path";
import { promisify } from "util";
import { getDeps } from "../../utils/dependencies";
import { depsInstall as runInstallDependencies } from "../../utils/installs";
import { npmScripts as runAddNpmScripts } from "../../utils/npmScripts";
import { runCreateReactApp } from "../../utils/runCreateReactApp";
import { tasks as runTasks } from "../../utils/tasks";

const access = promisify(fs.access);
const copy = promisify(ncp);

const copyFiles = async (from, to) => {
  return copy(from, to, {
    clobber: false,
  });
};

const getPath = (url, template = "") => {
  const currentFileUrl = import.meta.url;
  return path.resolve(
    new URL(currentFileUrl).pathname.slice(1),
    url,
    template.toLowerCase(),
  );
};

export async function createProject(options) {
  options = {
    ...options,
    targetDirectory: process.cwd(),
  };

  const dependencies = getDeps(options);

  const { template } = options;

  const templateDir = getPath("../../../templates", template);
  const lintersDir = getPath("../../../templates/linters");
  const stylesDir = getPath("../../../templates/styles");

  options.templateDirectory = templateDir;
  options.lintersDirectory = lintersDir;
  options.stylesDirectory = stylesDir;

  try {
    await access(templateDir, fs.constants.R_OK);
    await access(lintersDir, fs.constants.R_OK);
    await access(stylesDir, fs.constants.R_OK);
  } catch (err) {
    console.log(err);
    console.error("%s Invalid template name", chalk.red.bold("ERROR"));
    process.exit(1);
  }
  await runCreateReactApp(options).run();
  await runTasks(options, copyFiles).run();
  await runInstallDependencies(dependencies, options).run();
  await runAddNpmScripts(options).run();

  console.log("Project ready", chalk.green.bold("DONE"));
  return true;
}
