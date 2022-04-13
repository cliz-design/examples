#!/usr/bin/env node
import { createSingleCommandProgram } from '@cliz/cli';

import { ls } from './core/ls';

createSingleCommandProgram(
  __dirname,
  { autoOutputHelp: false },
  async function (program) {
    program
      .argument('<path>', 'The path to list', {
        default: process.cwd(),
      })
      .option('-a, --all', 'Show all files, include hide files')
      .action(async ({ args, options }) => {
        await ls(args.path as string, options);
      });
  },
);
