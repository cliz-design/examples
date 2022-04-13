import { defineSubCommand } from '@cliz/cli';

import { ls } from '../../core/network/ls';

export default defineSubCommand((createCommand) => {
  return createCommand('List networks')
    // .option('-a, --all', 'Show all containers (default shows just running)')
    .action(async ({ options }) => {
      await ls(options);
    });
});
