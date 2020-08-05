import execa from "execa";
import Listr from "listr";
import path from "path";
import { cleanDir } from "./cleanDir";

export const tasks = (options, copyFiles) => {
  const {
    template,
    templateDirectory,
    targetDirectory,
    lintersDirectory,
    stylesDirectory,
  } = options;

  const forReact = () => template === "react" || template === "react-redux";
  const forJS = () => template === "javascript";
  const reactSrc = path.resolve(targetDirectory, "src");

  return new Listr([
    {
      title: "Install create-react-app",
      enabled: () => forReact(),
      task: () => execa("npx create-react-app ."),
    },
    {
      title: "Remove default react files",
      enabled: () => forReact(),
      task: () => cleanDir(reactSrc),
    },
    {
      title: "Copy template",
      task: () => copyFiles(templateDirectory, targetDirectory),
    },
    {
      title: "Copy linter rules",
      task: () => copyFiles(lintersDirectory, targetDirectory),
    },
    {
      title: "Copy styles",
      task: () => copyFiles(stylesDirectory, targetDirectory + "/src/styles"),
    },
    {
      title: "Initial package.json",
      enabled: () => forJS(),
      task: () => execa("npm", ["init", "-y"]),
    },
  ]);
};
