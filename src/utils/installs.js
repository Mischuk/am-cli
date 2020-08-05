import execa from "execa";
import Listr from "listr";
import UpdaterRenderer from "listr-update-renderer";

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
        let args = ["install", "--save-dev"];
        parentTask.title = `Install dependencies: ${dep} [${installProgress}]`;
        updateProgress(index + 1);
        return execa("npm", args.concat(dep, ["--verbose"]));
      },
    });
  });

  return tasks;
}

export function depsInstall(deps, options) {
  const { runInstall } = options;

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
        skip: () =>
          !runInstall
            ? "Pass --install to automatically install dependencies"
            : undefined,
      },
    ],
    {
      renderer: UpdaterRenderer,
      collapse: false,
      showSubtasks: false,
    },
  );
}
