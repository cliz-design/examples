import { defineSubCommand } from '@cliz/cli';

import { images } from '../core/images';

export default defineSubCommand((createCommand) => {
  return createCommand('List images')
    .option('-a, --all', 'Show all containers (default shows just running)')
    .action(async ({ options }) => {
      await images(options);
    });
});
