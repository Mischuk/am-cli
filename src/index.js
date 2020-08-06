import { Command } from "commander";
import fs from "fs";
import { createProject } from "./commands/create";
import { getPath } from "./utils/getPath";
import {
  parseArgumentsIntoOptions,
  promptForMissingOptions,
} from "./utils/options";
import { getTemplate } from "./utils/template";
const program = new Command();
const componentEnv = "GENERATE_TEMPLATE_URL";
async function generateComponent() {
  console.log("Start generate component...");

  const dirEnv = getPath("../../template.env");

  fs.readFile(dirEnv, function (err, data) {
    if (err) {
      console.log(err);
    } else {
      let currentTemplateUrl = data.toString().slice(componentEnv.length + 1);

      if (currentTemplateUrl.length > 0) {
        console.log("Get path from file");
      } else {
        getPath(currentTemplateUrl);
      }
    }
  });
}

async function setComponent(paths) {
  console.log("set component");
  const dirEnv = getPath("../template.env");
  fs.writeFileSync(dirEnv, `${componentEnv}="${paths}"`);
}

export async function cli(args) {
  /*
    CREATE PROJECT
  */
  program
    .command("create [template]")
    .allowUnknownOption()
    .action(async template => {
      const currentTemplate = await getTemplate(template);
      let options = parseArgumentsIntoOptions(args, currentTemplate);
      options = await promptForMissingOptions(options);
      await createProject(options);
    });

  /*
    GENERATE COMPONENT
  */

  program
    .command("generate")
    .alias("g")
    .allowUnknownOption()
    .action(() => generateComponent());
  program
    .command("set <path>")
    .alias("s")
    .allowUnknownOption()
    .action(path => setComponent(path));

  program.parse(process.argv);
}
