import { defineSubCommand } from '@cliz/cli';

import { history } from '../core/history';

export default defineSubCommand((createCommand) => {
  return createCommand('Show the history of an image')
    .argument('<id>', 'IMAGE ID | NAME')
    .action(async ({ args, options }) => {
      const id = args.id as string;

      await history(id, options);
    });
});
