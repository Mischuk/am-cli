import fs from "fs";
import path from "path";

export const cleanDir = dirPath => {
  if (fs.existsSync(dirPath)) {
    let dirents = fs.readdirSync(dirPath, { withFileTypes: true });

    let files = dirents
      .filter(dirent => dirent.isFile())
      .map(dirent => dirent.name);

    for (const file of files) {
      fs.unlink(path.join(dirPath, file), err => {
        if (err) throw err;
      });
    }
  }
};
