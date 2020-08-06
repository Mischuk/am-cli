import path from "path";

export const getPath = url => {
  const currentFileUrl = import.meta.url;
  return path.resolve(new URL(currentFileUrl).pathname.slice(1), url);
};
