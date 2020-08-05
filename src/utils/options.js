import arg from "arg";
import inquirer from "inquirer";

export function parseArgumentsIntoOptions(rawArgs, template) {
  const args = arg(
    {
      "--install": Boolean,
      "--redux": Boolean,
      "-i": "--install",
      "-r": "--redux",
    },
    {
      argv: rawArgs.slice(4),
      permissive: true,
    },
  );

  return {
    template,
    runInstall: args["--install"] || true,
    redux: args["--redux"] || false,
  };
}

export async function promptForMissingOptions(options) {
  const questions = [];

  if (options.template === "react" && !options.redux) {
    questions.push({
      type: "confirm",
      name: "redux",
      message: "Initialize a redux?",
      default: true,
    });
  }

  const answers = await inquirer.prompt(questions);

  return {
    ...options,
    template:
      (options.redux || answers.redux) && options.template === "react"
        ? `react-redux`
        : options.template,
    redux:
      options.template === "javascript"
        ? false
        : answers.redux || options.redux,
  };
}
