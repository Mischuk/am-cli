import execa from "execa";
import Listr from "listr";
import UpdaterRenderer from "listr-update-renderer";

export const runCreateReactApp = options => {
  const { template } = options;

  const forReact = () => template === "react" || template === "react-redux";

  return new Listr(
    [
      {
        title: "Install react app",
        enabled: () => forReact(),
        task: () => execa("npm", ["init", "react-app", "."]),
      },
    ],
    {
      renderer: UpdaterRenderer,
      collapse: false,
      showSubtasks: true,
      concurrent: false,
    },
  );
};
