#!/usr/bin/env node
import { createSingleCommandProgram, doreamon } from '@cliz/cli';

createSingleCommandProgram(
  __dirname,
  { autoOutputHelp: false },
  async function (program) {
    program
      .action(async () => {
        console.log(doreamon.uuid());
      });
  },
);
