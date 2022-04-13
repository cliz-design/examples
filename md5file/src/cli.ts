#!/usr/bin/env node
import { createSingleCommandProgram, api } from '@cliz/cli';
import * as fs from 'fs';
import * as crypto from 'crypto';

createSingleCommandProgram(
  __dirname,
  { autoOutputHelp: false },
  async function (program) {
    program
      .argument('<file>', 'The file to md5')
      .action(async ({ args }) => {
        let file = args.file as string;
        if (!api.path.isAbs(file)) {
          file = api.path.join(process.cwd(), file);
        }

        console.log(await getFileMd5(file));
      });
  },
);

async function getFileMd5(filepath: string) {
  return new Promise<string>((resolve, reject) => {
    const md5 = crypto.createHash('md5');
    const stream = fs.createReadStream(filepath);

    stream.on('data', (chunk) => {
      md5.update(chunk);
    });

    stream.on('end', () => {
      resolve(md5.digest('hex'));
    });

    stream.on('error', (err) => {
      reject(err);
    });
  });
}