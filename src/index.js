import { Command } from "commander";
import { createProject } from "./commands/create";
import {
  parseArgumentsIntoOptions,
  promptForMissingOptions,
} from "./utils/options";
import { getTemplate } from "./utils/template";
const program = new Command();

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

  program.parse(process.argv);
}
