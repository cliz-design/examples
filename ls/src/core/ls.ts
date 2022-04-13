import { api, doreamon } from '@cliz/cli';
import * as fs from 'fs';
import { resolve } from 'path';
import { fileSize } from '@zodash/file-size';
import { printTable } from '../utils/printTable';

export interface LsOptions {
  all?: boolean;
}

export async function ls(path: string, options?: LsOptions) {
  // console.log('path:', path, resolve(path));
  let files = await api.fs.listDir(resolve(path));
  if (!options.all) {
    files = files.filter((file) => !/^\./.test(file.name));
  }

  const data = await Promise.all(files.map(async (file) => {
    const stat = await fs.promises.stat(file.absolutePath);
    return [
      '0' + (stat.mode & parseInt('777', 8)).toString(8),
      stat.uid,
      stat.gid,
      fileSize(stat.size),
      doreamon.date(stat.mtimeMs).format('YYYY-MM-DD HH:mm:ss'),
      !file.isDir ? file.name : api.color.chalk.cyan(file.name),
    ];
  }));
  
  printTable(
    ['MODE', 'UID', 'GID', 'SIZE', 'MODIFIED', 'NAME'],
    data,
  );
}
