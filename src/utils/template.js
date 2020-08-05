import chalk from "chalk";
import inquirer from "inquirer";

function validateTemplate(template) {
  const availableTemplates = ["js", "javascript", "react"];
  const currentTemplate = template.toLowerCase();
  if (availableTemplates.includes(currentTemplate)) {
    switch (currentTemplate) {
      case "js":
      case "javascript":
        return "javascript";
      case "react":
        return "react";
      default:
        return false;
    }
  } else {
    console.error(
      "%s",
      "Invalid template name:",
      chalk.red.bold(`${template}`),
    );
    console.log("Correct template name: js, javascript or react");
    process.exit(1);
  }
}

export function getTemplate(template) {
  if (!template) {
    return inquirer
      .prompt([
        {
          type: "list",
          name: "projectType",
          message: "Your project will based on",
          choices: ["Javascript", "React"],
        },
      ])
      .then(answers => answers.projectType.toLowerCase());
  }

  return validateTemplate(template);
}
