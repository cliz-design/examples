import { defineSubCommand } from '@cliz/cli';

import { ps } from '../core/ps';

export default defineSubCommand((createCommand) => {
  return createCommand('List containers')
    .option('-a, --all', 'Show all containers (default shows just running)')
    .action(async ({ options }) => {
      await ps(options);
    });
});
