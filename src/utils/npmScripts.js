import execa from "execa";
import Listr from "listr";

export const npmScripts = options => {
  const { template, runInstall } = options;
  return new Listr([
    {
      title: "Add scripts to package.json",
      enabled: () => template === "javascript" && runInstall,
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
};
